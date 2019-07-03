using AutoMapper;
using PortalUser.Domain;
using PortalUser.Models;
using System;

namespace PortalUser.Automapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserViewModel, User>()
                .ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.Id))
                .ForMember(dest => dest.UserName, opts => opts.MapFrom(src => src.UserName))
                .ForMember(dest => dest.DepartmentId, opts => opts.MapFrom(src => src.DepartmentId))
                .ForMember(dest => dest.Department, opts => opts.Ignore());
            CreateMap<User, UserViewModel>()
               .ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.Id))
               .ForMember(dest => dest.UserName, opts => opts.MapFrom(src => src.UserName))
               .ForMember(dest => dest.DepartmentId, opts => opts.MapFrom(src => src.DepartmentId))
               .ForMember(dest => dest.Department, opts => opts.MapFrom(src => src.Department.Title));
        }
    }
}
