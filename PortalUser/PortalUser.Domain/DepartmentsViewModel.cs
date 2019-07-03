using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PortalUser.Domain
{
    public class DepartmentsViewModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "no set name department")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "error length name (min length 3 and max lenght 50)")]
        public string Title { get; set; }
        
    }
}
