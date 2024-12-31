using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;


namespace AnimalFinderBackend.Models
    {
    public class User : IdentityUser
        {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [JsonIgnore]
        public ICollection<Animal> Animals { get; set; }
        public ICollection<Comment> Comments { get; set; }
        }
    }
