using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using AnimalFinderBackend.Models;

namespace AnimalFinderBackend.Data
    {
    public class ApplicationDbContext : IdentityDbContext<User>
        {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
            {
            }

        public DbSet<Animal> Animals { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Test> Tests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
            base.OnModelCreating(modelBuilder);

            // Relationship User och Animal
            modelBuilder.Entity<User>()
                .HasMany(u => u.Animals)
                .WithOne(a => a.User)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade); //If deleting user, all connected animals are delted

            // Relationship User och Comment
            modelBuilder.Entity<User>()
                .HasMany(u => u.Comments)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.NoAction); //If trying to delete a user, comments from user will be left

            // Relationship Animal och Comment
            modelBuilder.Entity<Animal>()
                .HasMany(a => a.Comments)
                .WithOne(c => c.Animal)
                .HasForeignKey(c => c.AnimalId)
                .OnDelete(DeleteBehavior.Cascade); //If deleting an animal all connected comments will be deleted
            }
        }
    }
