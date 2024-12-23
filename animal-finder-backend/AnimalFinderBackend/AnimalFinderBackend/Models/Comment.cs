namespace AnimalFinderBackend.Models
    {
    public class Comment
        {
        public int CommentId { get; set; } // Primary key
        public int AnimalId { get; set; } // Foreign key
        public string UserId { get; set; } // Foreign key 
        public string Content { get; set; }
        public DateTime DateCreated { get; set; }

        public Animal Animal { get; set; } // A comment belongs to an animal
        public User User { get; set; } // A comment is written by a user
        }
    }
