namespace AnimalFinderBackend.DTOs
    {
    public class AnimalPublicResponseDto
        {
        public int AnimalId { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Neighborhood { get; set; }
        public DateTime DateOfDisappearance { get; set; }
        public string ImageUrl { get; set; }
        }
    }
