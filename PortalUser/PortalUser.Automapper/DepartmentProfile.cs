using AutoMapper;
using PortalUser.Domain;
using PortalUser.Models;
using System;

namespace PortalUser.Automapper
{
    public class DepartmentProfile : Profile
    {
        public DepartmentProfile()
        {
            CreateMap<DepartmentsViewModel, Department>()
                .ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.Id))
                .ForMember(dest => dest.Title, opts => opts.MapFrom(src => src.Title))
                .ForMember(dest => dest.Users, opts => opts.Ignore());
            CreateMap<Department, DepartmentsViewModel>()
               .ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.Id))
               .ForMember(dest => dest.Title, opts => opts.MapFrom(src => src.Title));
        }
    }
}
