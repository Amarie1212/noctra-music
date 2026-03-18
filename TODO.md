# Fix Dropdown & UI Layout Issues

## Status: [0/7] Issues Fixed

### 1. Detail Header Layout (Foto 1) - `apps/desktop/src/styles/global.css` + `LibraryPane.tsx`
- [ ] Responsive 2-baris saat kecil: Baris 1 (back+text left), Baris 2 (tombol left align)
- [ ] 1-baris saat lebar: back+text kiri, tombol kanan
- [ ] Hapus hover scale animation semua button/dropdown (cukup hover warna)

### 2. Player Controls Sizing (Foto 2) - `NowPlayingPane.tsx` + `global.css`
- [ ] Fixed size play button (tidak scale berlebihan saat jendela lebar)
- [ ] Hapus hover scale, cukup hover warna

### 3. PlaylistPickerModal Layout (Foto 3) - `LibraryPane.tsx`
- [ ] Playlist dropdown + create input bersampingan
- [ ] List lagu di bawah
- [ ] Dropdown styling konsisten

### 4. Track Selection FAB (Foto 4) - `global.css` + `LibraryPane.tsx`
- [ ] Perbaiki desain FAB (lebih clean/elegan)

### 5. TrackList Reorder Cursor (Foto 5) - `TrackList.tsx` + `global.css`
- [ ] Hapus cursor "grab" pada reorder drag handle

### 6. Header Spacing (Foto 6) - `App.tsx` + `global.css`
- [ ] Kurangi padding atas-bawah header
- [ ] Margin window (bawah, kanan, kiri) tetap

### 7. Add Playlist Button Theme (Foto 7) - `MainHeader.tsx` + `global.css`
- [ ] Warnai button sesuai tema (accent color)

## Next Steps
1. CSS fixes global (layout responsive, hover states)
2. JSX structure changes (LibraryPane detail header, PlaylistPickerModal)
3. Component sizing (NowPlayingPane play button)
4. Test responsive di berbagai ukuran jendela
