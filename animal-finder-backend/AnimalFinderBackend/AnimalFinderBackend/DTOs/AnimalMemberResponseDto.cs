namespace AnimalFinderBackend.DTOs
    {
    public class AnimalMemberResponseDto
        {
        public int AnimalId { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Neighborhood { get; set; }
        public DateTime DateOfDisappearance { get; set; }
        public string ImageUrl { get; set; }
        public string OwnerFirstName { get; set; }
        public string OwnerLastName { get; set; }
        public string UserId { get; set; }
        }
    }
