// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use palette::{Srgb, Lch, Gradient, convert::FromColorUnclamped, FromColor};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![generate_colors])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn generate_colors(r: u8, g: u8, b: u8, _a: u8) -> Vec<Vec<u8>> {
    let rgb = Srgb::new(
        r as f32 / 255.0,
        g as f32 / 255.0,
        b as f32 / 255.0
    );
    let lch = Lch::from_color_unclamped(rgb.into_linear());
    let gradient = Gradient::new(vec![
        Lch::new(0.0, lch.chroma, lch.hue),
        lch,
        Lch::new(128.0, lch.chroma, lch.hue)
    ]);
    let colors = gradient
        .take(10)
        .map(|color| {
            let (r, g, b) = Srgb::from_color(color).into_components();
            return vec![
                (r * 255.0) as u8,
                (g * 255.0) as u8,
                (b * 255.0) as u8
            ]
        })
        .collect::<Vec<_>>();
    return colors
}
