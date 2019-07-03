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
using ProtalUser.Infrastructure.Enum;

namespace PortalUser.Controllers
{
    [Route("api/[controller]")]
    public class DepartmentsController : Controller
    {
        private PortalUserContext context;
        private IHostingEnvironment env;
        private IMapper mapper;
        public DepartmentsController(PortalUserContext _context, IHostingEnvironment _env, IMapper _mapper)
        {
            context = _context;
            env =_env;
            mapper = _mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetDepartments()
        {
            var departments = await context.Departments.ToListAsync();
            return Ok(departments);
        }

       [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartmentById(int id)
        {
            var department = context.Departments.FirstOrDefault(x => x.Id == id);
            if (department == null)
                return BadRequest();
            return Ok(department);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DepartmentsViewModel department)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var map = mapper.Map<Department>(department);
            context.Departments.Add(map);
            await context.SaveChangesAsync();
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var department = await context.Departments.FirstOrDefaultAsync(x => x.Id == id);
            if (department == null)
                return BadRequest();
            context.Departments.Remove(department);
            await context.SaveChangesAsync();
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IActionResult> Edit([FromBody]DepartmentsViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var map = mapper.Map<Department>(model);
            context.Entry(map).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok();
        }

    }
}