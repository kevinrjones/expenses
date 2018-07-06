using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Expenses.Repository.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
//            migrationBuilder.CreateTable(
//                name: "AspNetClaimTypes",
//                columns: table => new
//                {
//                    Id = table.Column<string>(nullable: false),
//                    ConcurrencyStamp = table.Column<string>(nullable: true),
//                    Description = table.Column<string>(nullable: true),
//                    Name = table.Column<string>(maxLength: 256, nullable: false),
//                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
//                    Required = table.Column<bool>(nullable: false),
//                    Reserved = table.Column<bool>(nullable: false),
//                    Rule = table.Column<string>(nullable: true),
//                    RuleValidationFailureDescription = table.Column<string>(nullable: true),
//                    UserEditable = table.Column<bool>(nullable: false, defaultValue: false),
//                    ValueType = table.Column<int>(nullable: false)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_AspNetClaimTypes", x => x.Id);
//                    table.UniqueConstraint("AK_AspNetClaimTypes_Name", x => x.Name);
//                });
//
//            migrationBuilder.CreateTable(
//                name: "AspNetRoles",
//                columns: table => new
//                {
//                    Id = table.Column<string>(nullable: false),
//                    ConcurrencyStamp = table.Column<string>(nullable: true),
//                    Description = table.Column<string>(nullable: true),
//                    Name = table.Column<string>(maxLength: 256, nullable: true),
//                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
//                    Reserved = table.Column<bool>(nullable: false)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
//                });
//
//            migrationBuilder.CreateTable(
//                name: "AspNetUsers",
//                columns: table => new
//                {
//                    Wibble = table.Column<string>(nullable: true),
//                    Id = table.Column<string>(nullable: false),
//                    AccessFailedCount = table.Column<int>(nullable: false),
//                    ConcurrencyStamp = table.Column<string>(nullable: true),
//                    Discriminator = table.Column<string>(nullable: false),
//                    Email = table.Column<string>(maxLength: 256, nullable: true),
//                    EmailConfirmed = table.Column<bool>(nullable: false),
//                    FirstName = table.Column<string>(nullable: true),
//                    IsBlocked = table.Column<bool>(nullable: false),
//                    IsDeleted = table.Column<bool>(nullable: false),
//                    LastName = table.Column<string>(nullable: true),
//                    LockoutEnabled = table.Column<bool>(nullable: false),
//                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
//                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
//                    NormalizedFirstName = table.Column<string>(maxLength: 256, nullable: true),
//                    NormalizedLastName = table.Column<string>(maxLength: 256, nullable: true),
//                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
//                    PasswordHash = table.Column<string>(nullable: true),
//                    PhoneNumber = table.Column<string>(nullable: true),
//                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
//                    SecurityStamp = table.Column<string>(nullable: true),
//                    TwoFactorEnabled = table.Column<bool>(nullable: false),
//                    UserName = table.Column<string>(maxLength: 256, nullable: true)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
//                });
//
//            migrationBuilder.CreateTable(
//                name: "AspNetRoleClaims",
//                columns: table => new
//                {
//                    Id = table.Column<int>(nullable: false)
//                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
//                    ClaimType = table.Column<string>(nullable: true),
//                    ClaimValue = table.Column<string>(nullable: true),
//                    RoleId = table.Column<string>(nullable: false)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
//                    table.ForeignKey(
//                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
//                        column: x => x.RoleId,
//                        principalTable: "AspNetRoles",
//                        principalColumn: "Id",
//                        onDelete: ReferentialAction.Cascade);
//                });
//
//            migrationBuilder.CreateTable(
//                name: "AspNetUserClaims",
//                columns: table => new
//                {
//                    Id = table.Column<int>(nullable: false)
//                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
//                    ClaimType = table.Column<string>(nullable: false),
//                    ClaimValue = table.Column<string>(nullable: true),
//                    UserId = table.Column<string>(nullable: false)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
//                    table.ForeignKey(
//                        name: "FK_AspNetUserClaims_AspNetClaimTypes_ClaimType",
//                        column: x => x.ClaimType,
//                        principalTable: "AspNetClaimTypes",
//                        principalColumn: "Name",
//                        onDelete: ReferentialAction.Cascade);
//                    table.ForeignKey(
//                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
//                        column: x => x.UserId,
//                        principalTable: "AspNetUsers",
//                        principalColumn: "Id",
//                        onDelete: ReferentialAction.Cascade);
//                });
//
//            migrationBuilder.CreateTable(
//                name: "AspNetUserLogins",
//                columns: table => new
//                {
//                    LoginProvider = table.Column<string>(nullable: false),
//                    ProviderKey = table.Column<string>(nullable: false),
//                    ProviderDisplayName = table.Column<string>(nullable: true),
//                    UserId = table.Column<string>(nullable: false)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
//                    table.ForeignKey(
//                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
//                        column: x => x.UserId,
//                        principalTable: "AspNetUsers",
//                        principalColumn: "Id",
//                        onDelete: ReferentialAction.Cascade);
//                });
//
//            migrationBuilder.CreateTable(
//                name: "AspNetUserRoles",
//                columns: table => new
//                {
//                    UserId = table.Column<string>(nullable: false),
//                    RoleId = table.Column<string>(nullable: false)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
//                    table.ForeignKey(
//                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
//                        column: x => x.RoleId,
//                        principalTable: "AspNetRoles",
//                        principalColumn: "Id",
//                        onDelete: ReferentialAction.Cascade);
//                    table.ForeignKey(
//                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
//                        column: x => x.UserId,
//                        principalTable: "AspNetUsers",
//                        principalColumn: "Id",
//                        onDelete: ReferentialAction.Cascade);
//                });
//
//            migrationBuilder.CreateTable(
//                name: "AspNetUserTokens",
//                columns: table => new
//                {
//                    UserId = table.Column<string>(nullable: false),
//                    LoginProvider = table.Column<string>(nullable: false),
//                    Name = table.Column<string>(nullable: false),
//                    Value = table.Column<string>(nullable: true)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
//                    table.ForeignKey(
//                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
//                        column: x => x.UserId,
//                        principalTable: "AspNetUsers",
//                        principalColumn: "Id",
//                        onDelete: ReferentialAction.Cascade);
//                });

            migrationBuilder.CreateTable(
                name: "Expenses",
                columns: table => new
                {
                    ExpenseId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expenses", x => x.ExpenseId);
                    table.ForeignKey(
                        name: "FK_Expenses_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

//            migrationBuilder.CreateIndex(
//                name: "ClaimTypeNameIndex",
//                table: "AspNetClaimTypes",
//                column: "NormalizedName",
//                unique: true);
//
//            migrationBuilder.CreateIndex(
//                name: "IX_AspNetRoleClaims_RoleId",
//                table: "AspNetRoleClaims",
//                column: "RoleId");
//
//            migrationBuilder.CreateIndex(
//                name: "RoleNameIndex",
//                table: "AspNetRoles",
//                column: "NormalizedName",
//                unique: true);
//
//            migrationBuilder.CreateIndex(
//                name: "IX_AspNetUserClaims_ClaimType",
//                table: "AspNetUserClaims",
//                column: "ClaimType");
//
//            migrationBuilder.CreateIndex(
//                name: "IX_AspNetUserClaims_UserId",
//                table: "AspNetUserClaims",
//                column: "UserId");
//
//            migrationBuilder.CreateIndex(
//                name: "IX_AspNetUserLogins_UserId",
//                table: "AspNetUserLogins",
//                column: "UserId");
//
//            migrationBuilder.CreateIndex(
//                name: "IX_AspNetUserRoles_RoleId",
//                table: "AspNetUserRoles",
//                column: "RoleId");
//
//            migrationBuilder.CreateIndex(
//                name: "EmailIndex",
//                table: "AspNetUsers",
//                column: "NormalizedEmail");
//
//            migrationBuilder.CreateIndex(
//                name: "FirstNameIndex",
//                table: "AspNetUsers",
//                column: "NormalizedFirstName");
//
//            migrationBuilder.CreateIndex(
//                name: "LastNameIndex",
//                table: "AspNetUsers",
//                column: "NormalizedLastName");
//
//            migrationBuilder.CreateIndex(
//                name: "UserNameIndex",
//                table: "AspNetUsers",
//                column: "NormalizedUserName",
//                unique: true);
//
//            migrationBuilder.CreateIndex(
//                name: "CountIndex",
//                table: "AspNetUsers",
//                columns: new[] { "IsBlocked", "IsDeleted" });
//
//            migrationBuilder.CreateIndex(
//                name: "CountIndexReversed",
//                table: "AspNetUsers",
//                columns: new[] { "IsDeleted", "IsBlocked" });

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_UserId",
                table: "Expenses",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
//            migrationBuilder.DropTable(
//                name: "AspNetRoleClaims");
//
//            migrationBuilder.DropTable(
//                name: "AspNetUserClaims");
//
//            migrationBuilder.DropTable(
//                name: "AspNetUserLogins");
//
//            migrationBuilder.DropTable(
//                name: "AspNetUserRoles");
//
//            migrationBuilder.DropTable(
//                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Expenses");

//            migrationBuilder.DropTable(
//                name: "AspNetClaimTypes");
//
//            migrationBuilder.DropTable(
//                name: "AspNetRoles");
//
//            migrationBuilder.DropTable(
//                name: "AspNetUsers");
        }
    }
}
