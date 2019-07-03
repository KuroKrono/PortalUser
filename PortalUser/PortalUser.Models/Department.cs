using System;
using System.Collections.Generic;
using System.Text;

namespace PortalUser.Models
{
    public class Department
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
