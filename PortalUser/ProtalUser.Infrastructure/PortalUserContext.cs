using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PortalUser.Models;
using System;

namespace ProtalUser.Infrastructure
{
    public class PortalUserContext : IdentityDbContext<ApplicationUser, ApplicationRole, string, IdentityUserClaim<string>, UserRole, IdentityUserLogin<string>, 
        IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public DbSet<User> PortalUsers { get; set; }

        public DbSet<Department> Departments { get; set; }

        public DbSet<ApplicationUser> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<ApplicationRole> RolesForUsers { get; set; }

        public PortalUserContext(DbContextOptions<PortalUserContext> options): base(options)
        {
          
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRole)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRole)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });
            base.OnModelCreating(builder);
        }
    }
}
