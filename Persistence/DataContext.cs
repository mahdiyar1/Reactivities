using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) 
            : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new {aa.ActivityId, aa.AppUserId}));

            builder.Entity<ActivityAttendee>()
               .HasOne(aa => aa.AppUser)
               .WithMany(u => u.Activities)
               .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<ActivityAttendee>()
               .HasOne(aa => aa.Activity)
               .WithMany(a => a.Attendees)
               .HasForeignKey(aa => aa.ActivityId);
            
            builder.Entity<Comment>()
                .HasOne(c => c.Activity)
                .WithMany(a => a.Comments)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<UserFollowing>(b => {
                b.HasKey(uf => new {uf.ObserverId, uf.TargetId});

                b.HasOne(uf => uf.Observer)
                    .WithMany(u => u.Followings)
                    .HasForeignKey(uf => uf.ObserverId);
                
                b.HasOne(uf => uf.Target)
                    .WithMany(u => u.Followers)
                    .HasForeignKey(uf => uf.TargetId);
            });
        }
    }
}