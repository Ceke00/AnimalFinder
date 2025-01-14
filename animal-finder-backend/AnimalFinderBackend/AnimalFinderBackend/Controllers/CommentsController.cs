using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnimalFinderBackend.Data;
using AnimalFinderBackend.Models;
using System.Security.Claims;
using AnimalFinderBackend.DTOs;


namespace AnimalFinderBackend.Controllers
    {
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
        {
        private readonly ApplicationDbContext _context;

        public CommentsController(ApplicationDbContext context)
            {
            _context = context;
            }


        ////Getting a specific comment. Used by PostComment.
        ////api/comments/{id}
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<CommentDto>> GetComment(int id)
            {
            //Getting comment from id. Projecting data into CommentDto
            var comment = await _context.Comments
                .Where(c => c.CommentId == id)
                .Select(c => new CommentDto
                    {
                    CommentId = c.CommentId,
                    Content = c.Content,
                    UserId = c.UserId,
                    FirstName = c.User.FirstName,
                    LastName = c.User.LastName,
                    DateCreated = c.DateCreated,
                    AvatarUrl = c.User.AvatarUrl
                    })
                .FirstOrDefaultAsync();

            //if no comment found
            if (comment == null)
                {
                return NotFound();
                }

            return Ok(comment);
            }

        //Getting comments for a specific animal
        //api/comments/animal/{animalId}
        [Authorize]
        [HttpGet("animal/{animalId}")]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetCommentsForAnimal(int animalId)
            {

            //Getting data on comments and projecting it to the dto
            var comments = await _context.Comments
                .Where(c => c.AnimalId == animalId)
                .Select(c => new CommentDto
                    {
                    CommentId = c.CommentId,
                    Content = c.Content,
                    UserId = c.UserId,
                    FirstName = c.User.FirstName,
                    LastName = c.User.LastName,
                    DateCreated = c.DateCreated,
                    AvatarUrl = c.User.AvatarUrl
                    })
                .ToListAsync();

            return Ok(comments);
            }


        //Posting comments on a specific animal
        //api/comments/{animalId}
        [Authorize]
        [HttpPost("{animalId}")]
        public async Task<ActionResult<Comment>> PostComment(int animalId, CommentContentDto commentContentDto)
            {
            //Finding userId from token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                {
                return Unauthorized();
                }

            //Creates a new Comment object and sets data from the dto and the userID
            var comment = new Comment
                {
                Content = commentContentDto.Content,
                UserId = userId,
                AnimalId = animalId,
                DateCreated = DateTime.UtcNow
                };

            //Adds Comment to context
            _context.Comments.Add(comment);
            //saves to db
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComment", new { id = comment.CommentId }, comment);
            }

        //Updating a specific comment
        //api/comments/{animalId}/{commentId}
        [Authorize]
        [HttpPut("{animalId}/{commentId}")]
        public async Task<IActionResult> PutComment(int animalId, int commentId, CommentContentDto commentContentDto)
            {
            //Getting userId from token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                {
                return Unauthorized();
                }

            //Getting comment from db with animalId, commentId and userId
            var existingComment = await _context.Comments
                .FirstOrDefaultAsync(c => c.AnimalId == animalId && c.CommentId == commentId && c.UserId == userId);

            if (existingComment == null)
                {
                return NotFound();
                }

            //Updating comment content
            existingComment.Content = commentContentDto.Content;

            //marking comment as modified
            _context.Entry(existingComment).State = EntityState.Modified;

            //Saving to db
            try
                {
                await _context.SaveChangesAsync();
                }
            catch (DbUpdateConcurrencyException)
                {
                if (!CommentExists(commentId))
                    {
                    return NotFound();
                    }
                else
                    {
                    throw;
                    }
                }

            return NoContent();
            }


        //Deleteing a specific comment
        //api/comments/{animalId}/{commentId}
        [Authorize]
        [HttpDelete("{animalId}/{commentId}")]
        public async Task<IActionResult> DeleteComment(int animalId, int commentId)
            {

            //getting userId from token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                {
                return Unauthorized();
                }

            //Getting comment based on animalId, commentId and userId
            var comment = await _context.Comments
                .FirstOrDefaultAsync(c => c.AnimalId == animalId && c.CommentId == commentId && c.UserId == userId);

            if (comment == null)
                {
                return NotFound();
                }
            //Deletes comment from context
            _context.Comments.Remove(comment);
            //Saving changes
            await _context.SaveChangesAsync();

            return NoContent();
            }

        //Check if comment exists
        private bool CommentExists(int id)
            {
            return _context.Comments.Any(e => e.CommentId == id);
            }
        }
    }


