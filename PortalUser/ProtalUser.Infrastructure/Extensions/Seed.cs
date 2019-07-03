
using PortalUser.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ProtalUser.Infrastructure.Extensions
{
    public class Seed
    {
        public static void Initialize(PortalUserContext context)
        {
            if (!context.Users.Any())
            {
                var department = new Department
                {
                    Id = 1,
                    Title = "Managment"
                };
                var department2 = new Department
                {
                    Id = 2,
                    Title = "It"
                };

                var user = new User
                {
                    Id = 1,
                    UserName = "User One",
                    Department = department
                };
                var user2 = new User
                {
                    Id = 2,
                    UserName = "User One",
                    Department = department2
                };
                context.Departments.Add(department);
                context.Departments.Add(department2);
                context.SaveChanges();
                context.PortalUsers.Add(user);
                context.PortalUsers.Add(user2);
                context.SaveChanges();
            }

        }
    }
}