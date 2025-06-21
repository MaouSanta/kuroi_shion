export interface Tag {
    name: string;
    color: string; // Mantine 颜色名称，如 'blue', 'pink', 'green' 等
    isStatusTag?: boolean; // 新增字段，标记是否是状态标签（如“已演唱”、“未演唱”）
}