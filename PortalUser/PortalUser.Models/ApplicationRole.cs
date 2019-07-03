using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace PortalUser.Models
{
    public class ApplicationRole : IdentityRole
    {
        public string Title { get; set; }

        public virtual ICollection<UserRole> UserRole { get; set; }

    }
}
