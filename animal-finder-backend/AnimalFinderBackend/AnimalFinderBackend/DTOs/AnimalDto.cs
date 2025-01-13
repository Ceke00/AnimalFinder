using System.ComponentModel.DataAnnotations;

namespace AnimalFinderBackend.DTOs
    {
    public class AnimalDto
        {

        [Required]
        [RegularExpression(@"^[A-Za-zÅÄÖåäö\s]+$", ErrorMessage = "Only letters and spaces are allowed.")]
        [MaxLength(50, ErrorMessage = "Type cannot exceed 50 characters.")]
        public string Type { get; set; }

        [Required]
        [RegularExpression(@"^[A-Za-zÅÄÖåäö\s]+$", ErrorMessage = "Only letters and spaces are allowed.")]
        [MaxLength(50, ErrorMessage = "Name cannot exceed 50 characters.")]
        public string Name { get; set; }

        [Required]
        [RegularExpression(@"^[A-Za-zÅÄÖåäö\s.!?]+$", ErrorMessage = "Only letters, spaces, and certain punctuation are allowed.")]
        [MaxLength(1000, ErrorMessage = "Description cannot exceed 1000 characters.")]
        public string Description { get; set; }

        [Required]
        [RegularExpression(@"^[A-Za-zÅÄÖåäö\s]+$", ErrorMessage = "Only letters and spaces are allowed.")]
        [MaxLength(50, ErrorMessage = "Neighborhood cannot exceed 50 characters.")]
        public string Neighborhood { get; set; }


        public DateTime DateOfDisappearance { get; set; }


        public string? ImageUrl { get; set; }


        }
    }
