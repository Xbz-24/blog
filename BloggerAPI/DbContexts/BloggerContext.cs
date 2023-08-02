using Microsoft.EntityFrameworkCore;
using BloggerAPI.Models;

namespace BloggerAPI.DbContexts
{
  public class BloggerContext : DbContext
  { 
    public BloggerContext(DbContextOptions<BloggerContext> options) : base(options)
    {

    }
    public DbSet<Post> Posts { get; set; }
  }
}
