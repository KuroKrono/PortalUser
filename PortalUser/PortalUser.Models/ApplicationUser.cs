using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace PortalUser.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Login { get; set; }

        public string Password { get; set; }
        
        public virtual ICollection<UserRole> UserRole { get; set; }
    }
}
