using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using AnimalFinderBackend.Models;
using Microsoft.EntityFrameworkCore.Diagnostics;

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


            // Seed data
            SeedData(modelBuilder);
            }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
            optionsBuilder.ConfigureWarnings(warnings => warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
            }
        private void SeedData(ModelBuilder modelBuilder)
            {
            //hashing password
            var hasher = new PasswordHasher<User>();

            var users = new List<User>
        {
            new User
            {
                //Guid creates unique Id
                Id = Guid.NewGuid().ToString(),
                UserName = "user1@example.com",
                NormalizedUserName = "USER1@EXAMPLE.COM",
                Email = "user1@example.com",
                NormalizedEmail = "USER1@EXAMPLE.COM",
                FirstName = "John",
                LastName = "Doe",
                AvatarUrl = "FaRegSmile",
                PasswordHash = hasher.HashPassword(null, "Password123!")
            },
            new User
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "user2@example.com",
                NormalizedUserName = "USER2@EXAMPLE.COM",
                Email = "user2@example.com",
                NormalizedEmail = "USER2@EXAMPLE.COM",
                FirstName = "Jane",
                LastName = "Smith",
                AvatarUrl = "SiHappycow",
                PasswordHash = hasher.HashPassword(null, "Password123!")
            },
            new User
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "user3@example.com",
                NormalizedUserName = "USER3@EXAMPLE.COM",
                Email = "user3@example.com",
                NormalizedEmail = "USER3@EXAMPLE.COM",
                FirstName = "Alice",
                LastName = "Johnson",
                AvatarUrl = "GiWomanElfFace",
                PasswordHash = hasher.HashPassword(null, "Password123!")
            },
            new User
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "user4@example.com",
                NormalizedUserName = "USER4@EXAMPLE.COM",
                Email = "user4@example.com",
                NormalizedEmail = "USER4@EXAMPLE.COM",
                FirstName = "Bob",
                LastName = "Brown",
                AvatarUrl = "GiTurtle",
                PasswordHash = hasher.HashPassword(null, "Password123!")
            },
            new User
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "user5@example.com",
                NormalizedUserName = "USER5@EXAMPLE.COM",
                Email = "user5@example.com",
                NormalizedEmail = "USER5@EXAMPLE.COM",
                FirstName = "Charlie",
                LastName = "Davis",
                AvatarUrl = "LuDog",
                PasswordHash = hasher.HashPassword(null, "Password123!")
            }
        };

            modelBuilder.Entity<User>().HasData(users);

            var animals = new List<Animal>
        {
            new Animal
            {
                AnimalId = 1,
                UserId = users[0].Id,
                Type = "Dog",
                Name = "Buddy",
                Description = "Friendly dog",
                Neighborhood = "Linero",
                DateOfDisappearance = DateTime.Now.AddDays(-10),
                ImageUrl = "/uploads/dog1.jpg",
                DateAdded = DateTime.Now
            },
            new Animal
            {
                AnimalId = 2,
                UserId = users[1].Id,
                Type = "Cat",
                Name = "Whiskers",
                Description = "Cute cat",
                Neighborhood = "Väster",
                DateOfDisappearance = DateTime.Now.AddDays(-5),
                ImageUrl = "/uploads/cat1.jpg",
                DateAdded = DateTime.Now
            },
            new Animal
            {
                AnimalId = 3,
                UserId = users[2].Id,
                Type = "Turtle",
                Name = "Shelly",
                Description = "Slow but steady",
                Neighborhood = "Gunnesbo",
                DateOfDisappearance = DateTime.Now.AddDays(-3),
                ImageUrl = "/uploads/turtle1.jpg",
                DateAdded = DateTime.Now
            },
            new Animal
            {
                AnimalId = 4,
                UserId = users[3].Id,
                Type = "Hamster",
                Name = "Nibbles",
                Description = "Loves to run in the wheel",
                Neighborhood = "Linero",
                DateOfDisappearance = DateTime.Now.AddDays(-7),
                ImageUrl = "/uploads/hamster1.jpg",
                DateAdded = DateTime.Now
            },
            new Animal
            {
                AnimalId = 5,
                UserId = users[4].Id,
                Type = "Fish",
                Name = "Goldie",
                Description = "Swims around all day",
                Neighborhood = "Väster",
                DateOfDisappearance = DateTime.Now.AddDays(-2),
                ImageUrl = "/uploads/fish1.jpg",
                DateAdded = DateTime.Now
            },
            new Animal
            {
                AnimalId = 6,
                UserId = users[0].Id,
                Type = "Rabbit",
                Name = "Thumper",
                Description = "Loves to hop around",
                Neighborhood = "Linero",
                DateOfDisappearance = DateTime.Now.AddDays(-1),
                ImageUrl = "/uploads/rabbit1.jpg",
                DateAdded = DateTime.Now
            },
            new Animal
            {
                AnimalId = 7,
                UserId = users[1].Id,
                Type = "Dog",
                Name = "Max",
                Description = "Very playful",
                Neighborhood = "Väster",
                DateOfDisappearance = DateTime.Now.AddDays(-4),
                ImageUrl = "/uploads/dog2.jpg",
                DateAdded = DateTime.Now
            },
            new Animal
            {
                AnimalId = 8,
                UserId = users[2].Id,
                Type = "Cat",
                Name = "Mittens",
                Description = "Loves to nap",
                Neighborhood = "Gunnesbo",
                DateOfDisappearance = DateTime.Now.AddDays(-6),
                ImageUrl = "/uploads/cat2.jpg",
                DateAdded = DateTime.Now
            }
        };

            modelBuilder.Entity<Animal>().HasData(animals);

            var comments = new List<Comment>
        {
            new Comment { CommentId = 1, AnimalId = 1, UserId = users[1].Id, Content = "I saw this dog near the park!", DateCreated = DateTime.Now.AddDays(-1) },
            new Comment { CommentId = 2, AnimalId = 1, UserId = users[2].Id, Content = "Looks like a friendly dog.", DateCreated = DateTime.Now.AddDays(-2) },
            new Comment { CommentId = 3, AnimalId = 2, UserId = users[0].Id, Content = "I think I saw this cat in my neighborhood.", DateCreated = DateTime.Now.AddDays(-3) },
            new Comment { CommentId = 4, AnimalId = 2, UserId = users[3].Id, Content = "Such a cute cat!", DateCreated = DateTime.Now.AddDays(-4) },
            new Comment { CommentId = 5, AnimalId = 3, UserId = users[4].Id, Content = "I saw a turtle like this near the pond.", DateCreated = DateTime.Now.AddDays(-5) },
            new Comment { CommentId = 6, AnimalId = 3, UserId = users[1].Id, Content = "Hope you find your turtle soon.", DateCreated = DateTime.Now.AddDays(-6) },
            new Comment { CommentId = 7, AnimalId = 4, UserId = users[2].Id, Content = "Hamsters are so cute!", DateCreated = DateTime.Now.AddDays(-7) },
            new Comment { CommentId = 8, AnimalId = 4, UserId = users[0].Id, Content = "I hope you find Nibbles soon.", DateCreated = DateTime.Now.AddDays(-8) },
            new Comment { CommentId = 9, AnimalId = 5, UserId = users[3].Id, Content = "Goldie is such a beautiful fish.", DateCreated = DateTime.Now.AddDays(-9) },
            new Comment { CommentId = 10, AnimalId = 5, UserId = users[2].Id, Content = "I saw a fish like this at the pet store.", DateCreated = DateTime.Now.AddDays(-10) },
            new Comment { CommentId = 11, AnimalId = 6, UserId = users[4].Id, Content = "Thumper is adorable!", DateCreated = DateTime.Now.AddDays(-11) },
            new Comment { CommentId = 12, AnimalId = 6, UserId = users[1].Id, Content = "I hope you find your rabbit soon.", DateCreated = DateTime.Now.AddDays(-12) },
            new Comment { CommentId = 13, AnimalId = 7, UserId = users[0].Id, Content = "Max is such a playful dog.", DateCreated = DateTime.Now.AddDays(-13) },
            new Comment { CommentId = 14, AnimalId = 7, UserId = users[3].Id, Content = "I saw a dog like this at the park.", DateCreated = DateTime.Now.AddDays(-14) },
            new Comment { CommentId = 15, AnimalId = 8, UserId = users[2].Id, Content = "Mittens is so cute!", DateCreated = DateTime.Now.AddDays(-15) },
            new Comment { CommentId = 16, AnimalId = 8, UserId = users[4].Id, Content = "I hope you find your cat soon.", DateCreated = DateTime.Now.AddDays(-16) },
            new Comment { CommentId = 17, AnimalId = 1, UserId = users[3].Id, Content = "I saw Buddy near the park.", DateCreated = DateTime.Now.AddDays(-17) },
            new Comment { CommentId = 18, AnimalId = 2, UserId = users[0].Id, Content = "Whiskers is adorable.", DateCreated = DateTime.Now.AddDays(-18) },
            new Comment { CommentId = 19, AnimalId = 3, UserId = users[1].Id, Content = "I saw Shelly near the pond.", DateCreated = DateTime.Now.AddDays(-19) },
            new Comment { CommentId = 20, AnimalId = 4, UserId = users[2].Id, Content = "Nibbles is so cute!", DateCreated = DateTime.Now.AddDays(-20) }
        };

            modelBuilder.Entity<Comment>().HasData(comments);
            }
        }

    }

