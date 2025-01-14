namespace AnimalFinderBackend.DTOs
    {
    public class CommentDto
        {
        public int CommentId { get; set; }
        public string Content { get; set; }
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateCreated { get; set; }
        public string AvatarUrl { get; set; }
        }
    }
