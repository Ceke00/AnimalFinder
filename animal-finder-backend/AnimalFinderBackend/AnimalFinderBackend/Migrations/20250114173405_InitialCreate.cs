using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AnimalFinderBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AvatarUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Animals",
                columns: table => new
                {
                    AnimalId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Neighborhood = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfDisappearance = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateAdded = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Animals", x => x.AnimalId);
                    table.ForeignKey(
                        name: "FK_Animals_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    CommentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AnimalId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.CommentId);
                    table.ForeignKey(
                        name: "FK_Comments_Animals_AnimalId",
                        column: x => x.AnimalId,
                        principalTable: "Animals",
                        principalColumn: "AnimalId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "AvatarUrl", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "25e84f78-927a-4cb3-abd3-d4b61f30498f", 0, "LuDog", "9c801750-8789-4b70-a281-6432f880d1e0", "user5@example.com", false, "Charlie", "Davis", false, null, "USER5@EXAMPLE.COM", "USER5@EXAMPLE.COM", "AQAAAAIAAYagAAAAELAcDNXCSLeYHD4Tvmtyr+C9UWKDrdQk2xFzp7evAQxQN7NUdwcHgHRUqqRxXsNrZw==", null, false, "2793b8d8-1cbd-4e5c-8186-7a42f01e9063", false, "user5@example.com" },
                    { "49f7aa22-8ac7-4a1c-ab37-397616e53760", 0, "SiHappycow", "d514d320-30fb-4f7e-a199-83dfaa45d23c", "user2@example.com", false, "Jane", "Smith", false, null, "USER2@EXAMPLE.COM", "USER2@EXAMPLE.COM", "AQAAAAIAAYagAAAAED/YPbEz4DMH4RXlU4UymKEZWcesmEAYqbrQt+3EYGhB/OOu9RIGBgRWzYWCQ3terA==", null, false, "3fb68f84-85a2-485f-b900-ae1f13672b2e", false, "user2@example.com" },
                    { "815c3358-58bb-4928-b121-62a27623ae08", 0, "GiWomanElfFace", "f36b13c7-3da3-44da-b1cb-75510a759102", "user3@example.com", false, "Alice", "Johnson", false, null, "USER3@EXAMPLE.COM", "USER3@EXAMPLE.COM", "AQAAAAIAAYagAAAAEEGa8+nwJvJaDMiQPOsF/ldGEQs6wXiJVuGI6dsyu6W1dNr6fe2K5sjmE+8793K7Lg==", null, false, "4a9d435d-d2a3-4b33-8fc2-791f64607da7", false, "user3@example.com" },
                    { "9d6eee41-1ac7-487c-9317-53b387a8318a", 0, "GiTurtle", "f36b63eb-bf67-43a9-a2c1-5bfe1a524259", "user4@example.com", false, "Bob", "Brown", false, null, "USER4@EXAMPLE.COM", "USER4@EXAMPLE.COM", "AQAAAAIAAYagAAAAED419RnuxQ9e884rl9lFwk3M1uJiTQXKzRm1BAPahcHmx7+Kkid1qsmaMnXQfsKZbQ==", null, false, "1e1b3975-3ed3-45d3-84f9-eeb70d9d10a7", false, "user4@example.com" },
                    { "a6d5f611-72ce-40a8-8733-6b132746da46", 0, "FaRegSmile", "8dd960b6-3faf-4401-a849-924016cef427", "user1@example.com", false, "John", "Doe", false, null, "USER1@EXAMPLE.COM", "USER1@EXAMPLE.COM", "AQAAAAIAAYagAAAAEHHWg9j720NsIQkZVqn7GR9V3aiv2dA7GBddhVTqKoq1qwCfmw18vuNpV7GqSKL0Yg==", null, false, "aa6e00a4-146f-4005-bfc6-2bbb4b3e9f65", false, "user1@example.com" }
                });

            migrationBuilder.InsertData(
                table: "Animals",
                columns: new[] { "AnimalId", "DateAdded", "DateOfDisappearance", "Description", "ImageUrl", "Name", "Neighborhood", "Type", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 1, 14, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7167), new DateTime(2025, 1, 4, 18, 34, 3, 947, DateTimeKind.Local).AddTicks(2339), "Friendly dog", "/uploads/dog1.jpg", "Buddy", "Linero", "Dog", "a6d5f611-72ce-40a8-8733-6b132746da46" },
                    { 2, new DateTime(2025, 1, 14, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7741), new DateTime(2025, 1, 9, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7668), "Cute cat", "/uploads/cat1.jpg", "Whiskers", "Väster", "Cat", "49f7aa22-8ac7-4a1c-ab37-397616e53760" },
                    { 3, new DateTime(2025, 1, 14, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7751), new DateTime(2025, 1, 11, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7749), "Slow but steady", "/uploads/turtle1.jpg", "Shelly", "Gunnesbo", "Turtle", "815c3358-58bb-4928-b121-62a27623ae08" },
                    { 4, new DateTime(2025, 1, 14, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7758), new DateTime(2025, 1, 7, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7756), "Loves to run in the wheel", "/uploads/hamster1.jpg", "Nibbles", "Linero", "Hamster", "9d6eee41-1ac7-487c-9317-53b387a8318a" },
                    { 5, new DateTime(2025, 1, 14, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7765), new DateTime(2025, 1, 12, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7763), "Swims around all day", "/uploads/fish1.jpg", "Goldie", "Väster", "Fish", "25e84f78-927a-4cb3-abd3-d4b61f30498f" },
                    { 6, new DateTime(2025, 1, 14, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7785), new DateTime(2025, 1, 13, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7782), "Loves to hop around", "/uploads/rabbit1.jpg", "Thumper", "Linero", "Rabbit", "a6d5f611-72ce-40a8-8733-6b132746da46" },
                    { 7, new DateTime(2025, 1, 14, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7791), new DateTime(2025, 1, 10, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7789), "Very playful", "/uploads/dog2.jpg", "Max", "Väster", "Dog", "49f7aa22-8ac7-4a1c-ab37-397616e53760" },
                    { 8, new DateTime(2025, 1, 14, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7798), new DateTime(2025, 1, 8, 18, 34, 3, 950, DateTimeKind.Local).AddTicks(7795), "Loves to nap", "/uploads/cat2.jpg", "Mittens", "Gunnesbo", "Cat", "815c3358-58bb-4928-b121-62a27623ae08" }
                });

            migrationBuilder.InsertData(
                table: "Comments",
                columns: new[] { "CommentId", "AnimalId", "Content", "DateCreated", "UserId" },
                values: new object[,]
                {
                    { 1, 1, "I saw this dog near the park!", new DateTime(2025, 1, 13, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(943), "49f7aa22-8ac7-4a1c-ab37-397616e53760" },
                    { 2, 1, "Looks like a friendly dog.", new DateTime(2025, 1, 12, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1320), "815c3358-58bb-4928-b121-62a27623ae08" },
                    { 3, 2, "I think I saw this cat in my neighborhood.", new DateTime(2025, 1, 11, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1336), "a6d5f611-72ce-40a8-8733-6b132746da46" },
                    { 4, 2, "Such a cute cat!", new DateTime(2025, 1, 10, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1340), "9d6eee41-1ac7-487c-9317-53b387a8318a" },
                    { 5, 3, "I saw a turtle like this near the pond.", new DateTime(2025, 1, 9, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1344), "25e84f78-927a-4cb3-abd3-d4b61f30498f" },
                    { 6, 3, "Hope you find your turtle soon.", new DateTime(2025, 1, 8, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1393), "49f7aa22-8ac7-4a1c-ab37-397616e53760" },
                    { 7, 4, "Hamsters are so cute!", new DateTime(2025, 1, 7, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1411), "815c3358-58bb-4928-b121-62a27623ae08" },
                    { 8, 4, "I hope you find Nibbles soon.", new DateTime(2025, 1, 6, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1414), "a6d5f611-72ce-40a8-8733-6b132746da46" },
                    { 9, 5, "Goldie is such a beautiful fish.", new DateTime(2025, 1, 5, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1418), "9d6eee41-1ac7-487c-9317-53b387a8318a" },
                    { 10, 5, "I saw a fish like this at the pet store.", new DateTime(2025, 1, 4, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1432), "815c3358-58bb-4928-b121-62a27623ae08" },
                    { 11, 6, "Thumper is adorable!", new DateTime(2025, 1, 3, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1436), "25e84f78-927a-4cb3-abd3-d4b61f30498f" },
                    { 12, 6, "I hope you find your rabbit soon.", new DateTime(2025, 1, 2, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1440), "49f7aa22-8ac7-4a1c-ab37-397616e53760" },
                    { 13, 7, "Max is such a playful dog.", new DateTime(2025, 1, 1, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1443), "a6d5f611-72ce-40a8-8733-6b132746da46" },
                    { 14, 7, "I saw a dog like this at the park.", new DateTime(2024, 12, 31, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1453), "9d6eee41-1ac7-487c-9317-53b387a8318a" },
                    { 15, 8, "Mittens is so cute!", new DateTime(2024, 12, 30, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1457), "815c3358-58bb-4928-b121-62a27623ae08" },
                    { 16, 8, "I hope you find your cat soon.", new DateTime(2024, 12, 29, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1461), "25e84f78-927a-4cb3-abd3-d4b61f30498f" },
                    { 17, 1, "I saw Buddy near the park.", new DateTime(2024, 12, 28, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1465), "9d6eee41-1ac7-487c-9317-53b387a8318a" },
                    { 18, 2, "Whiskers is adorable.", new DateTime(2024, 12, 27, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1471), "a6d5f611-72ce-40a8-8733-6b132746da46" },
                    { 19, 3, "I saw Shelly near the pond.", new DateTime(2024, 12, 26, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1475), "49f7aa22-8ac7-4a1c-ab37-397616e53760" },
                    { 20, 4, "Nibbles is so cute!", new DateTime(2024, 12, 25, 18, 34, 3, 951, DateTimeKind.Local).AddTicks(1479), "815c3358-58bb-4928-b121-62a27623ae08" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Animals_UserId",
                table: "Animals",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_AnimalId",
                table: "Comments",
                column: "AnimalId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_UserId",
                table: "Comments",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Animals");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
