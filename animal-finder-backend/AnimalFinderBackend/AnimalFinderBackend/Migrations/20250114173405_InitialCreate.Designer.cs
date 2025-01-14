﻿// <auto-generated />
using System;
using AnimalFinderBackend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AnimalFinderBackend.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250114173405_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("AnimalFinderBackend.Models.Animal", b =>
                {
                    b.Property<int>("AnimalId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AnimalId"));

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateOfDisappearance")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Neighborhood")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("AnimalId");

                    b.HasIndex("UserId");

                    b.ToTable("Animals");

                    b.HasData(
                        new
                        {
                            AnimalId = 1,
                            DateAdded = new DateTime(2025, 1, 14, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7167),
                            DateOfDisappearance = new DateTime(2025, 1, 4, 18, 34, 3, 947, DateTimeKind.Local).AddTicks(2339),
                            Description = "Friendly dog",
                            ImageUrl = "/uploads/dog1.jpg",
                            Name = "Buddy",
                            Neighborhood = "Linero",
                            Type = "Dog",
                            UserId = "a6d5f611-72ce-40a8-8733-6b132746da46"
                        },
                        new
                        {
                            AnimalId = 2,
                            DateAdded = new DateTime(2025, 1, 14, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7741),
                            DateOfDisappearance = new DateTime(2025, 1, 9, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7668),
                            Description = "Cute cat",
                            ImageUrl = "/uploads/cat1.jpg",
                            Name = "Whiskers",
                            Neighborhood = "Väster",
                            Type = "Cat",
                            UserId = "49f7aa22-8ac7-4a1c-ab37-397616e53760"
                        },
                        new
                        {
                            AnimalId = 3,
                            DateAdded = new DateTime(2025, 1, 14, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7751),
                            DateOfDisappearance = new DateTime(2025, 1, 11, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7749),
                            Description = "Slow but steady",
                            ImageUrl = "/uploads/turtle1.jpg",
                            Name = "Shelly",
                            Neighborhood = "Gunnesbo",
                            Type = "Turtle",
                            UserId = "815c3358-58bb-4928-b121-62a27623ae08"
                        },
                        new
                        {
                            AnimalId = 4,
                            DateAdded = new DateTime(2025, 1, 14, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7758),
                            DateOfDisappearance = new DateTime(2025, 1, 7, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7756),
                            Description = "Loves to run in the wheel",
                            ImageUrl = "/uploads/hamster1.jpg",
                            Name = "Nibbles",
                            Neighborhood = "Linero",
                            Type = "Hamster",
                            UserId = "9d6eee41-1ac7-487c-9317-53b387a8318a"
                        },
                        new
                        {
                            AnimalId = 5,
                            DateAdded = new DateTime(2025, 1, 14, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7765),
                            DateOfDisappearance = new DateTime(2025, 1, 12, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7763),
                            Description = "Swims around all day",
                            ImageUrl = "/uploads/fish1.jpg",
                            Name = "Goldie",
                            Neighborhood = "Väster",
                            Type = "Fish",
                            UserId = "25e84f78-927a-4cb3-abd3-d4b61f30498f"
                        },
                        new
                        {
                            AnimalId = 6,
                            DateAdded = new DateTime(2025, 1, 14, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7785),
                            DateOfDisappearance = new DateTime(2025, 1, 13, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7782),
                            Description = "Loves to hop around",
                            ImageUrl = "/uploads/rabbit1.jpg",
                            Name = "Thumper",
                            Neighborhood = "Linero",
                            Type = "Rabbit",
                            UserId = "a6d5f611-72ce-40a8-8733-6b132746da46"
                        },
                        new
                        {
                            AnimalId = 7,
                            DateAdded = new DateTime(2025, 1, 14, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7791),
                            DateOfDisappearance = new DateTime(2025, 1, 10, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7789),
                            Description = "Very playful",
                            ImageUrl = "/uploads/dog2.jpg",
                            Name = "Max",
                            Neighborhood = "Väster",
                            Type = "Dog",
                            UserId = "49f7aa22-8ac7-4a1c-ab37-397616e53760"
                        },
                        new
                        {
                            AnimalId = 8,
                            DateAdded = new DateTime(2025, 1, 14, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7798),
                            DateOfDisappearance = new DateTime(2025, 1, 8, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7795),
                            Description = "Loves to nap",
                            ImageUrl = "/uploads/cat2.jpg",
                            Name = "Mittens",
                            Neighborhood = "Gunnesbo",
                            Type = "Cat",
                            UserId = "815c3358-58bb-4928-b121-62a27623ae08"
                        });
                });

            modelBuilder.Entity("AnimalFinderBackend.Models.Comment", b =>
                {
                    b.Property<int>("CommentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CommentId"));

                    b.Property<int>("AnimalId")
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime2");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("CommentId");

                    b.HasIndex("AnimalId");

                    b.HasIndex("UserId");

                    b.ToTable("Comments");

                    b.HasData(
                        new
                        {
                            CommentId = 1,
                            AnimalId = 1,
                            Content = "I saw this dog near the park!",
                            DateCreated = new DateTime(2025, 1, 13, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(943),
                            UserId = "49f7aa22-8ac7-4a1c-ab37-397616e53760"
                        },
                        new
                        {
                            CommentId = 2,
                            AnimalId = 1,
                            Content = "Looks like a friendly dog.",
                            DateCreated = new DateTime(2025, 1, 12, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1320),
                            UserId = "815c3358-58bb-4928-b121-62a27623ae08"
                        },
                        new
                        {
                            CommentId = 3,
                            AnimalId = 2,
                            Content = "I think I saw this cat in my neighborhood.",
                            DateCreated = new DateTime(2025, 1, 11, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1336),
                            UserId = "a6d5f611-72ce-40a8-8733-6b132746da46"
                        },
                        new
                        {
                            CommentId = 4,
                            AnimalId = 2,
                            Content = "Such a cute cat!",
                            DateCreated = new DateTime(2025, 1, 10, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1340),
                            UserId = "9d6eee41-1ac7-487c-9317-53b387a8318a"
                        },
                        new
                        {
                            CommentId = 5,
                            AnimalId = 3,
                            Content = "I saw a turtle like this near the pond.",
                            DateCreated = new DateTime(2025, 1, 9, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1344),
                            UserId = "25e84f78-927a-4cb3-abd3-d4b61f30498f"
                        },
                        new
                        {
                            CommentId = 6,
                            AnimalId = 3,
                            Content = "Hope you find your turtle soon.",
                            DateCreated = new DateTime(2025, 1, 8, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1393),
                            UserId = "49f7aa22-8ac7-4a1c-ab37-397616e53760"
                        },
                        new
                        {
                            CommentId = 7,
                            AnimalId = 4,
                            Content = "Hamsters are so cute!",
                            DateCreated = new DateTime(2025, 1, 7, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1411),
                            UserId = "815c3358-58bb-4928-b121-62a27623ae08"
                        },
                        new
                        {
                            CommentId = 8,
                            AnimalId = 4,
                            Content = "I hope you find Nibbles soon.",
                            DateCreated = new DateTime(2025, 1, 6, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1414),
                            UserId = "a6d5f611-72ce-40a8-8733-6b132746da46"
                        },
                        new
                        {
                            CommentId = 9,
                            AnimalId = 5,
                            Content = "Goldie is such a beautiful fish.",
                            DateCreated = new DateTime(2025, 1, 5, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1418),
                            UserId = "9d6eee41-1ac7-487c-9317-53b387a8318a"
                        },
                        new
                        {
                            CommentId = 10,
                            AnimalId = 5,
                            Content = "I saw a fish like this at the pet store.",
                            DateCreated = new DateTime(2025, 1, 4, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1432),
                            UserId = "815c3358-58bb-4928-b121-62a27623ae08"
                        },
                        new
                        {
                            CommentId = 11,
                            AnimalId = 6,
                            Content = "Thumper is adorable!",
                            DateCreated = new DateTime(2025, 1, 3, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1436),
                            UserId = "25e84f78-927a-4cb3-abd3-d4b61f30498f"
                        },
                        new
                        {
                            CommentId = 12,
                            AnimalId = 6,
                            Content = "I hope you find your rabbit soon.",
                            DateCreated = new DateTime(2025, 1, 2, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1440),
                            UserId = "49f7aa22-8ac7-4a1c-ab37-397616e53760"
                        },
                        new
                        {
                            CommentId = 13,
                            AnimalId = 7,
                            Content = "Max is such a playful dog.",
                            DateCreated = new DateTime(2025, 1, 1, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1443),
                            UserId = "a6d5f611-72ce-40a8-8733-6b132746da46"
                        },
                        new
                        {
                            CommentId = 14,
                            AnimalId = 7,
                            Content = "I saw a dog like this at the park.",
                            DateCreated = new DateTime(2024, 12, 31, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1453),
                            UserId = "9d6eee41-1ac7-487c-9317-53b387a8318a"
                        },
                        new
                        {
                            CommentId = 15,
                            AnimalId = 8,
                            Content = "Mittens is so cute!",
                            DateCreated = new DateTime(2024, 12, 30, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1457),
                            UserId = "815c3358-58bb-4928-b121-62a27623ae08"
                        },
                        new
                        {
                            CommentId = 16,
                            AnimalId = 8,
                            Content = "I hope you find your cat soon.",
                            DateCreated = new DateTime(2024, 12, 29, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1461),
                            UserId = "25e84f78-927a-4cb3-abd3-d4b61f30498f"
                        },
                        new
                        {
                            CommentId = 17,
                            AnimalId = 1,
                            Content = "I saw Buddy near the park.",
                            DateCreated = new DateTime(2024, 12, 28, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1465),
                            UserId = "9d6eee41-1ac7-487c-9317-53b387a8318a"
                        },
                        new
                        {
                            CommentId = 18,
                            AnimalId = 2,
                            Content = "Whiskers is adorable.",
                            DateCreated = new DateTime(2024, 12, 27, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1471),
                            UserId = "a6d5f611-72ce-40a8-8733-6b132746da46"
                        },
                        new
                        {
                            CommentId = 19,
                            AnimalId = 3,
                            Content = "I saw Shelly near the pond.",
                            DateCreated = new DateTime(2024, 12, 26, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1475),
                            UserId = "49f7aa22-8ac7-4a1c-ab37-397616e53760"
                        },
                        new
                        {
                            CommentId = 20,
                            AnimalId = 4,
                            Content = "Nibbles is so cute!",
                            DateCreated = new DateTime(2024, 12, 25, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1479),
                            UserId = "815c3358-58bb-4928-b121-62a27623ae08"
                        });
                });

            modelBuilder.Entity("AnimalFinderBackend.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("AvatarUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "a6d5f611-72ce-40a8-8733-6b132746da46",
                            AccessFailedCount = 0,
                            AvatarUrl = "FaRegSmile",
                            ConcurrencyStamp = "8dd960b6-3faf-4401-a849-924016cef427",
                            Email = "user1@example.com",
                            EmailConfirmed = false,
                            FirstName = "John",
                            LastName = "Doe",
                            LockoutEnabled = false,
                            NormalizedEmail = "USER1@EXAMPLE.COM",
                            NormalizedUserName = "USER1@EXAMPLE.COM",
                            PasswordHash = "AQAAAAIAAYagAAAAEHHWg9j720NsIQkZVqn7GR9V3aiv2dA7GBddhVTqKoq1qwCfmw18vuNpV7GqSKL0Yg==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "aa6e00a4-146f-4005-bfc6-2bbb4b3e9f65",
                            TwoFactorEnabled = false,
                            UserName = "user1@example.com"
                        },
                        new
                        {
                            Id = "49f7aa22-8ac7-4a1c-ab37-397616e53760",
                            AccessFailedCount = 0,
                            AvatarUrl = "SiHappycow",
                            ConcurrencyStamp = "d514d320-30fb-4f7e-a199-83dfaa45d23c",
                            Email = "user2@example.com",
                            EmailConfirmed = false,
                            FirstName = "Jane",
                            LastName = "Smith",
                            LockoutEnabled = false,
                            NormalizedEmail = "USER2@EXAMPLE.COM",
                            NormalizedUserName = "USER2@EXAMPLE.COM",
                            PasswordHash = "AQAAAAIAAYagAAAAED/YPbEz4DMH4RXlU4UymKEZWcesmEAYqbrQt+3EYGhB/OOu9RIGBgRWzYWCQ3terA==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "3fb68f84-85a2-485f-b900-ae1f13672b2e",
                            TwoFactorEnabled = false,
                            UserName = "user2@example.com"
                        },
                        new
                        {
                            Id = "815c3358-58bb-4928-b121-62a27623ae08",
                            AccessFailedCount = 0,
                            AvatarUrl = "GiWomanElfFace",
                            ConcurrencyStamp = "f36b13c7-3da3-44da-b1cb-75510a759102",
                            Email = "user3@example.com",
                            EmailConfirmed = false,
                            FirstName = "Alice",
                            LastName = "Johnson",
                            LockoutEnabled = false,
                            NormalizedEmail = "USER3@EXAMPLE.COM",
                            NormalizedUserName = "USER3@EXAMPLE.COM",
                            PasswordHash = "AQAAAAIAAYagAAAAEEGa8+nwJvJaDMiQPOsF/ldGEQs6wXiJVuGI6dsyu6W1dNr6fe2K5sjmE+8793K7Lg==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "4a9d435d-d2a3-4b33-8fc2-791f64607da7",
                            TwoFactorEnabled = false,
                            UserName = "user3@example.com"
                        },
                        new
                        {
                            Id = "9d6eee41-1ac7-487c-9317-53b387a8318a",
                            AccessFailedCount = 0,
                            AvatarUrl = "GiTurtle",
                            ConcurrencyStamp = "f36b63eb-bf67-43a9-a2c1-5bfe1a524259",
                            Email = "user4@example.com",
                            EmailConfirmed = false,
                            FirstName = "Bob",
                            LastName = "Brown",
                            LockoutEnabled = false,
                            NormalizedEmail = "USER4@EXAMPLE.COM",
                            NormalizedUserName = "USER4@EXAMPLE.COM",
                            PasswordHash = "AQAAAAIAAYagAAAAED419RnuxQ9e884rl9lFwk3M1uJiTQXKzRm1BAPahcHmx7+Kkid1qsmaMnXQfsKZbQ==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "1e1b3975-3ed3-45d3-84f9-eeb70d9d10a7",
                            TwoFactorEnabled = false,
                            UserName = "user4@example.com"
                        },
                        new
                        {
                            Id = "25e84f78-927a-4cb3-abd3-d4b61f30498f",
                            AccessFailedCount = 0,
                            AvatarUrl = "LuDog",
                            ConcurrencyStamp = "9c801750-8789-4b70-a281-6432f880d1e0",
                            Email = "user5@example.com",
                            EmailConfirmed = false,
                            FirstName = "Charlie",
                            LastName = "Davis",
                            LockoutEnabled = false,
                            NormalizedEmail = "USER5@EXAMPLE.COM",
                            NormalizedUserName = "USER5@EXAMPLE.COM",
                            PasswordHash = "AQAAAAIAAYagAAAAELAcDNXCSLeYHD4Tvmtyr+C9UWKDrdQk2xFzp7evAQxQN7NUdwcHgHRUqqRxXsNrZw==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "2793b8d8-1cbd-4e5c-8186-7a42f01e9063",
                            TwoFactorEnabled = false,
                            UserName = "user5@example.com"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("AnimalFinderBackend.Models.Animal", b =>
                {
                    b.HasOne("AnimalFinderBackend.Models.User", "User")
                        .WithMany("Animals")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("AnimalFinderBackend.Models.Comment", b =>
                {
                    b.HasOne("AnimalFinderBackend.Models.Animal", "Animal")
                        .WithMany("Comments")
                        .HasForeignKey("AnimalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AnimalFinderBackend.Models.User", "User")
                        .WithMany("Comments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Animal");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("AnimalFinderBackend.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("AnimalFinderBackend.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AnimalFinderBackend.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("AnimalFinderBackend.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AnimalFinderBackend.Models.Animal", b =>
                {
                    b.Navigation("Comments");
                });

            modelBuilder.Entity("AnimalFinderBackend.Models.User", b =>
                {
                    b.Navigation("Animals");

                    b.Navigation("Comments");
                });
#pragma warning restore 612, 618
        }
    }
}
