using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortalUser.Domain;
using PortalUser.Models;
using ProtalUser.Infrastructure;

namespace PortalUser.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private PortalUserContext context;
        private IHostingEnvironment env;
        private IMapper mapper;
        public UsersController(PortalUserContext _context, IHostingEnvironment _env, IMapper _mapper)
        {
            context = _context;
            env =_env;
            mapper = _mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await context.PortalUsers.ProjectTo<UserViewModel>(mapper.ConfigurationProvider).ToListAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = context.PortalUsers.FirstOrDefault(x => x.Id == id);
            if (user == null)
                return BadRequest();
            return Ok(user);
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UserViewModel user)
        {
            if (user == null)
                return BadRequest();
            var map = mapper.Map<User>(user);
            context.PortalUsers.Add(map);
            await context.SaveChangesAsync();
            return Ok();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await context.PortalUsers.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
                return BadRequest();
            context.PortalUsers.Remove(user);
            await context.SaveChangesAsync();
            return Ok();
        }
        
        [HttpPut]
        public async Task<IActionResult> Edit([FromBody]UserViewModel model)
        {
            var map = mapper.Map<User>(model);
            context.Entry(map).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok();
        }
        
    }
}