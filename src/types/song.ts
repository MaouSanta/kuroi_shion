// 单次表演的记录
export interface Performance {
    date: string; // 演唱日期，格式YYYY-MM-DD
    youtubeLink: string; // YouTube 完整链接，包含时间戳
}

// 歌单条目：每首歌名+歌手组合只有一个条目
export interface Song {
    id: string; // 唯一ID，可以是从Excel行号或UUID生成
    songName: string; // 歌名
    artist: string; // 歌手
    lyrics?: string; // 新增：歌词（可选，可以只放第一句）
    notes: string[]; // 备注，可以是清唱、非全曲等标签
    performances: Performance[]; // 核心改动：一个歌曲可以有多条表演记录
}