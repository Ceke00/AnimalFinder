using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnimalFinderBackend.Data;
using AnimalFinderBackend.Models;
using System.Security.Claims;
using AnimalFinderBackend.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace AnimalFinderBackend.Controllers
    {
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalsController : ControllerBase
        {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly ApplicationDbContext _context;

        public AnimalsController(ApplicationDbContext context, IWebHostEnvironment hostingEnvironment)
            {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
            }

        // Method to delete a file
        private void DeleteFile(string filePath)
            {
            if (System.IO.File.Exists(filePath))
                {
                System.IO.File.Delete(filePath);
                }
            }


        ////Listing all animals (public)
        [HttpGet("public")]
        public async Task<ActionResult<IEnumerable<AnimalPublicResponseDto>>> GetPublicAnimals()
            {
            var animals = await _context.Animals

                .Select(a => new AnimalPublicResponseDto
                    {
                    AnimalId = a.AnimalId,
                    Type = a.Type,
                    Name = a.Name,
                    Description = a.Description,
                    Neighborhood = a.Neighborhood,
                    DateOfDisappearance = a.DateOfDisappearance,
                    ImageUrl = a.ImageUrl,

                    })
                .ToListAsync();

            return Ok(animals);
            }


        //Getting all animals and some user details
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnimalMemberResponseDto>>> GetAnimals()
            {
            var animals = await _context.Animals
                .Include(a => a.User)
                .Select(a => new AnimalMemberResponseDto
                    {
                    AnimalId = a.AnimalId,
                    Type = a.Type,
                    Name = a.Name,
                    Description = a.Description,
                    Neighborhood = a.Neighborhood,
                    DateOfDisappearance = a.DateOfDisappearance,
                    ImageUrl = a.ImageUrl,
                    OwnerFirstName = a.User.FirstName,
                    OwnerLastName = a.User.LastName,
                    UserId = a.UserId
                    })
                .ToListAsync();

            return Ok(animals);
            }



        //Used by PostAnimal to confirm post and give feedback to client
        //GET: api/Animals/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Animal>> GetAnimal(int id)
            {
            var animal = await _context.Animals.FindAsync(id);

            if (animal == null)
                {
                return NotFound();
                }
            return animal;
            }

        //Specific user adding new animal
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Animal>> PostAnimal([FromForm] AnimalDto animalDto, IFormFile imageFile)
            {
            if (!ModelState.IsValid)
                {
                return BadRequest(new ValidationProblemDetails(ModelState));
                }

            //If image file is missing
            if (imageFile == null)
                {
                ModelState.AddModelError("ImageFile", "An image file is required.");
                return BadRequest(ModelState);
                }

            //Getting Id from token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            Console.WriteLine($"UserId from token: {userId}");

            //Control if Id is empty
            if (string.IsNullOrEmpty(userId))
                {
                return Unauthorized();
                }

            //Getting user from db
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                {
                return Unauthorized();
                }

            string imageUrl = null;

            //If there is a file, this will be saved in the folder uploads
            if (imageFile != null)
                {
                // Allowed file types
                var allowedFileTypes = new[] { "image/jpeg", "image/png", "image/webp" };

                // Max file size in bytes (1MB)
                var maxFileSize = 1 * 1024 * 1024;

                // Check file type
                if (!allowedFileTypes.Contains(imageFile.ContentType))
                    {
                    ModelState.AddModelError("ImageFile", "Invalid file type. Only JPEG, PNG, and WEBP are allowed.");
                    return BadRequest(new ValidationProblemDetails(ModelState));
                    }

                // Check file size
                if (imageFile.Length > maxFileSize)
                    {
                    ModelState.AddModelError("ImageFile", "File size exceeds the 1 MB limit.");
                    return BadRequest(new ValidationProblemDetails(ModelState));
                    }

                //Creates path to folder uploads
                var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
                //Creates folder if does not exist
                if (!Directory.Exists(uploads))
                    {
                    Directory.CreateDirectory(uploads);
                    }

                //Creates unique filename
                var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);

                //combines path to folder and the file name
                var filePath = Path.Combine(uploads, uniqueFileName);

                //Creates new file with the uploaded content
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                    await imageFile.CopyToAsync(fileStream);
                    }
                //set imageUrl to the path of the file
                imageUrl = "/uploads/" + uniqueFileName;
                }

            var animal = new Animal
                {
                Type = animalDto.Type,
                Name = animalDto.Name,
                Description = animalDto.Description,
                Neighborhood = animalDto.Neighborhood,
                DateOfDisappearance = animalDto.DateOfDisappearance,
                ImageUrl = imageUrl,
                UserId = userId,
                DateAdded = DateTime.UtcNow,
                };

            _context.Animals.Add(animal);
            await _context.SaveChangesAsync();

            // Return a confirmation response to the client
            return CreatedAtAction("GetAnimal", new { id = animal.AnimalId }, animal);
            }

        //Getting animals for a specific user
        [Authorize]
        [HttpGet("user")]
        public async Task<ActionResult<IEnumerable<Animal>>> GetUserAnimals()
            {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                {
                return Unauthorized();
                }

            var animals = await _context.Animals.Where(a => a.UserId == userId).ToListAsync();

            if (animals.Count == 0)
                {
                return NotFound("You do not have any animals listed.");
                }
            return Ok(animals);
            }


        //Updating specific animal. If no new imageFile is sent, old url will be used.
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserAnimal(int id, [FromForm] AnimalDto animalDto, IFormFile? imageFile)
            {

            // Getting id from token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                {
                return Unauthorized();
                }

            // Getting specific animal from id
            var animal = await _context.Animals.FindAsync(id);

            // If animal not found or does not belong to the user
            if (animal == null || animal.UserId != userId)
                {
                return NotFound();
                }

            animal.Type = animalDto.Type;
            animal.Name = animalDto.Name;
            animal.Description = animalDto.Description;
            animal.Neighborhood = animalDto.Neighborhood;
            animal.DateOfDisappearance = animalDto.DateOfDisappearance;

            //if no image is uploaded, keep existing URL
            if (imageFile == null)
                {
                // If no new image is uploaded, keep the existing image URL
                animal.ImageUrl = animalDto.ImageUrl;
                }


            else if (imageFile != null)
                {

                // Allowed file types
                var allowedFileTypes = new[] { "image/jpeg", "image/png", "image/webp" };

                // Max file size in bytes (1MB)
                var maxFileSize = 1 * 1024 * 1024;

                // Check file type
                if (!allowedFileTypes.Contains(imageFile.ContentType))
                    {
                    ModelState.AddModelError("ImageFile", "Invalid file type. Only JPEG, PNG, and WEBP are allowed.");
                    return BadRequest(new ValidationProblemDetails(ModelState));
                    }

                // Check file size
                if (imageFile.Length > maxFileSize)
                    {
                    ModelState.AddModelError("ImageFile", "File size exceeds the 1 MB limit.");
                    return BadRequest(new ValidationProblemDetails(ModelState));
                    }

                // Creates path to folder uploads
                var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
                // Creates folder if does not exist
                if (!Directory.Exists(uploads))
                    {
                    Directory.CreateDirectory(uploads);
                    }

                // Creates unique filename
                var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);

                // Combines path to folder and the file name
                var filePath = Path.Combine(uploads, uniqueFileName);

                // Creates new file with the uploaded content
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                    await imageFile.CopyToAsync(fileStream);
                    }


                // Delete the old image file
                if (!string.IsNullOrEmpty(animal.ImageUrl))
                    {
                    var oldFilePath = Path.Combine(_hostingEnvironment.WebRootPath, animal.ImageUrl.TrimStart('/'));
                    DeleteFile(oldFilePath);
                    }

                // Set imageUrl to the path of the file
                animal.ImageUrl = "/uploads/" + uniqueFileName;
                }

            _context.Entry(animal).State = EntityState.Modified;

            try
                {
                await _context.SaveChangesAsync();
                }
            catch (DbUpdateConcurrencyException)
                {
                if (!AnimalExists(id))
                    {
                    return NotFound("The animal does not exist");
                    }
                else
                    {
                    throw;
                    }
                }

            return NoContent();
            }





        //Deleting a specific animal for a specific user
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAnimal(int id)
            {
            //Getting userId from token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                {
                return Unauthorized();
                }

            //Getting animal from id
            var animal = await _context.Animals.FindAsync(id);
            if (animal == null)
                {
                return NotFound("The animal was not found.");
                }

            if (animal.UserId != userId)
                {
                return StatusCode(403, "You do not have the right to delete this animal");
                }

            // Delete the image file
            if (!string.IsNullOrEmpty(animal.ImageUrl))
                {
                var filePath = Path.Combine(_hostingEnvironment.WebRootPath, animal.ImageUrl.TrimStart('/'));
                DeleteFile(filePath);
                }

            _context.Animals.Remove(animal);
            await _context.SaveChangesAsync();

            return NoContent();
            }

        private bool AnimalExists(int id)
            {
            return _context.Animals.Any(e => e.AnimalId == id);
            }
        }
    }