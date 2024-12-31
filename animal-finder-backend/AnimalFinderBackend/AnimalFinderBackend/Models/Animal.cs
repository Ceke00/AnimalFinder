using System.Text.Json.Serialization;


namespace AnimalFinderBackend.Models

    {
    public class Animal
        {
        public int AnimalId { get; set; } // Primary key
        public string UserId { get; set; } // Foreign key (GUID)
        public string Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Neighborhood { get; set; }
        public DateTime DateOfDisappearance { get; set; }
        public string ImageUrl { get; set; }
        public DateTime DateAdded { get; set; }

        [JsonIgnore]
        public User User { get; set; } // An animal belongs to a user
        public ICollection<Comment> Comments { get; set; } // An animal can have several comments
        }
    }
