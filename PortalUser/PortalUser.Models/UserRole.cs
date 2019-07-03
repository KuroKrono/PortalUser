using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace PortalUser.Models
{
    public class UserRole : IdentityUserRole<string>
    {
        public string Id { get; set; }
       
        public virtual ApplicationUser User { get; set; }
       
        public virtual ApplicationRole Role { get; set; }
    }
}
