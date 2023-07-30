using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BloggerAPI.Models;
using BloggerAPI.DbContexts;

namespace BloggerAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PostsController : ControllerBase
  {
    private readonly BloggerContext _context;

    public PostsController(BloggerContext context)
    {
      _context = context;
    }

    // GET: api/posts
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
    {
      return await _context.Posts.ToListAsync();
    }

    // POST: api/posts
    [HttpPost]
    public async Task<ActionResult<Post>> CreatePost(Post post)
    {
      if (post == null)
      {
        return BadRequest();
      }

      _context.Posts.Add(post);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetPosts), new { id = post.Id }, post);
    }
  }
}
