import string

def egcd(a, b):
    if a == 0:
        return (b, 0, 1)
    else:
        g, y, x = egcd(b % a, a)
        return (g, x - (b // a) * y, y)

def modinv(a, m):
    g, x, y = egcd(a, m)
    if g != 1:
        raise Exception('Modular inverse does not exist')
    else:
        return x % m

def affine_encrypt(text, key):
    # Alphabet set (lowercase and uppercase letters)
    alphabet = string.ascii_letters

    # Key variables
    a, b = key

    # Encryption process
    encrypted_text = ''
    for char in text:
        if char in alphabet:
            char_idx = alphabet.index(char)
            encrypted_char_idx = (a * char_idx + b) % len(alphabet)
            encrypted_text += alphabet[encrypted_char_idx]
        else:
            encrypted_text += char

    return encrypted_text

def affine_decrypt(text, key):
    # Alphabet set (lowercase and uppercase letters)
    alphabet = string.ascii_letters

    # Key variables
    a, b = key

    # Decryption process
    decrypted_text = ''
    a_inv = modinv(a, len(alphabet))
    for char in text:
        if char in alphabet:
            char_idx = alphabet.index(char)
            decrypted_char_idx = (a_inv * (char_idx - b)) % len(alphabet)
            decrypted_text += alphabet[decrypted_char_idx]
        else:
            decrypted_text += char

    return decrypted_text

def encrypt_file(file_in, file_out, key):
    with open(file_in, 'r') as f:
        text = f.read()
        encrypted_text = affine_encrypt(text, key)

    with open(file_out, 'w') as f:
        f.write(encrypted_text)

def decrypt_file(file_in, file_out, key):
    with open(file_in, 'r') as f:
        text = f.read()
        decrypted_text = affine_decrypt(text, key)

    with open(file_out, 'w') as f:
        f.write(decrypted_text)

# Example usage
key = (3, 7)  # Affine key (a = 3, b = 7)

# Encrypt file
encrypt_file('input.txt', 'encrypted.txt', key)

# Decrypt file
decrypt_file('encrypted.txt', 'decrypted.txt', key)
