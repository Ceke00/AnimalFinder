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
        private readonly ApplicationDbContext _context;

        public AnimalsController(ApplicationDbContext context)
            {
            _context = context;
            }

        // GET: api/Animals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Animal>>> GetAnimals()
            {
            return await _context.Animals.ToListAsync();
            }

        // GET: api/Animals/5
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


        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Animal>> PostAnimal(AnimalDto animalDto)
            {
            //Getting Id from token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;



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


            var animal = new Animal
                {
                Type = animalDto.Type,
                Name = animalDto.Name,
                Description = animalDto.Description,
                Neighborhood = animalDto.Neighborhood,
                DateOfDisappearance = animalDto.DateOfDisappearance,
                ImageUrl = animalDto.ImageUrl,
                UserId = userId,
                DateAdded = DateTime.UtcNow,

                };

            _context.Animals.Add(animal);
            await _context.SaveChangesAsync();

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

        //Updating an animal for a specific user
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserAnimal(int id, AnimalDto animalDto)
            {
            //getting id from token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                {
                return Unauthorized();
                }

            //Getting specific animal from id
            var animal = await _context.Animals.FindAsync(id);

            //If animal not found
            if (animal == null || animal.UserId != userId)
                {
                return NotFound();
                }

            animal.Type = animalDto.Type;
            animal.Name = animalDto.Name;
            animal.Description = animalDto.Description;
            animal.Neighborhood = animalDto.Neighborhood;
            animal.DateOfDisappearance = animalDto.DateOfDisappearance;
            animal.ImageUrl = animalDto.ImageUrl;

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

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                {
                return Unauthorized();
                }

            var animal = await _context.Animals.FindAsync(id);
            if (animal == null)
                {
                return NotFound("The animal was not found.");
                }

            if (animal.UserId != userId)
                {
                return StatusCode(403, "You do not have the right to delete this animal");
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
