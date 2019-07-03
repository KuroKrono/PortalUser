using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace ProtalUser.Infrastructure.Services
{
    public class CryptServices
    {
        //шифрование
        public static string Encript(string plainText, string password)
        {
            string salt = "Alcatraz";
            string hashAlgoritm = "SHA1";
            int passwordIterations = 2;
            string initialVector = "QFRna74m*awe01xU";
            int keySize = 256;
            if (string.IsNullOrEmpty(plainText))
                return "";
            byte[] initialVectorBytes = Encoding.ASCII.GetBytes(initialVector);
            byte[] saltValuesBytes = Encoding.ASCII.GetBytes(salt);
            byte[] plainTextBytes = Encoding.UTF8.GetBytes(plainText);

            PasswordDeriveBytes derivedPassword = new PasswordDeriveBytes(password, saltValuesBytes, hashAlgoritm, passwordIterations);
            byte[] keyBytes = derivedPassword.GetBytes(keySize / 8);
            RijndaelManaged symetricKey = new RijndaelManaged();
            symetricKey.Mode = CipherMode.CBC;

            byte[] cipherTextBytes = null;

            using (ICryptoTransform encriptor = symetricKey.CreateEncryptor(keyBytes, initialVectorBytes))
            {
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream(memoryStream, encriptor, CryptoStreamMode.Write))
                    {
                        cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
                        cryptoStream.FlushFinalBlock();
                        cipherTextBytes = memoryStream.ToArray();
                        memoryStream.Close();
                        cryptoStream.Close();
                    }
                }
            }

            symetricKey.Clear();
            return Convert.ToBase64String(cipherTextBytes);
        }
        //дешифровка
        public static string Decript(string chiperTextm, string password)
        {
            string salt = "Alcatraz";
            string hashAlgoritm = "SHA1";
            int passwordIterations = 2;
            string initialVector = "QFRna74m*awe01xU";
            int keySize = 256;
            if (string.IsNullOrEmpty(chiperTextm))
                return "";

            byte[] initialVectorBytes = Encoding.ASCII.GetBytes(initialVector);
            byte[] saltValueBytes = Encoding.ASCII.GetBytes(salt);
            byte[] chipherTextBytes = Convert.FromBase64String(chiperTextm);

            PasswordDeriveBytes drivePassword = new PasswordDeriveBytes(password, saltValueBytes, hashAlgoritm, passwordIterations);
            byte[] keyBytes = drivePassword.GetBytes(keySize / 8);

            RijndaelManaged symetricKey = new RijndaelManaged();
            symetricKey.Mode = CipherMode.CBC;

            byte[] plaintextBytes = new byte[chipherTextBytes.Length];
            int byteCount = 0;
            using (ICryptoTransform decriptor = symetricKey.CreateDecryptor(keyBytes, initialVectorBytes))
            {
                using (MemoryStream memoryStream = new MemoryStream(chipherTextBytes))
                {
                    using (CryptoStream cryptoStream = new CryptoStream(memoryStream, decriptor, CryptoStreamMode.Read))
                    {
                        byteCount = cryptoStream.Read(plaintextBytes, 0, plaintextBytes.Length);
                        memoryStream.Close();
                        cryptoStream.Close();
                    }
                }
            }
            symetricKey.Clear();
            return Encoding.UTF8.GetString(plaintextBytes, 0, byteCount);
        }
    }
}
