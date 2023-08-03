public class Comment
{
    public int Id { get; set; }
    public string Content { get; set; }
    public string AuthorName { get; set; }
    public DateTime DateCreated { get; set; }
    public int PostId { get; set; }
    public Post Post { get; set; }
}
