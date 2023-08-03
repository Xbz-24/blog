namespace BloggerAPI.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        public Post()
        {
            Title = string.Empty;
            Content = string.Empty;
        }
    }
}
