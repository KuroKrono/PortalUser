using Microsoft.EntityFrameworkCore.Migrations;

namespace ProtalUser.Infrastructure.Migrations
{
    public partial class UserRole2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserRoleRoleId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserRoleUserId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserRoleRoleId",
                table: "AspNetRoles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserRoleUserId",
                table: "AspNetRoles",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_UserRoleUserId_UserRoleRoleId",
                table: "AspNetUsers",
                columns: new[] { "UserRoleUserId", "UserRoleRoleId" });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoles_UserRoleUserId_UserRoleRoleId",
                table: "AspNetRoles",
                columns: new[] { "UserRoleUserId", "UserRoleRoleId" });

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetRoles_AspNetUserRoles_UserRoleUserId_UserRoleRoleId",
                table: "AspNetRoles",
                columns: new[] { "UserRoleUserId", "UserRoleRoleId" },
                principalTable: "AspNetUserRoles",
                principalColumns: new[] { "UserId", "RoleId" },
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_AspNetUserRoles_UserRoleUserId_UserRoleRoleId",
                table: "AspNetUsers",
                columns: new[] { "UserRoleUserId", "UserRoleRoleId" },
                principalTable: "AspNetUserRoles",
                principalColumns: new[] { "UserId", "RoleId" },
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetRoles_AspNetUserRoles_UserRoleUserId_UserRoleRoleId",
                table: "AspNetRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_AspNetUserRoles_UserRoleUserId_UserRoleRoleId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_UserRoleUserId_UserRoleRoleId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetRoles_UserRoleUserId_UserRoleRoleId",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "UserRoleRoleId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UserRoleUserId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UserRoleRoleId",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "UserRoleUserId",
                table: "AspNetRoles");
        }
    }
}
