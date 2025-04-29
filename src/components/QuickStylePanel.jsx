import React from "react";

export default function QuickStylePanel({ styles, onChange }) {
  return (
    <div className="space-y-4 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-bold mb-2">🎨 تنظیمات سریع</h3>

      <div>
        <label>🎨 رنگ متن</label>
        <input
          type="color"
          value={styles.color}
          onChange={(e) => onChange({ ...styles, color: e.target.value })}
          className="w-full"
        />
      </div>

      <div>
        <label>🧱 رنگ پس‌زمینه</label>
        <input
          type="color"
          value={styles.backgroundColor}
          onChange={(e) =>
            onChange({ ...styles, backgroundColor: e.target.value })
          }
          className="w-full"
        />
      </div>

      <div>
        <label>🔠 سایز فونت</label>
        <input
          type="number"
          value={parseInt(styles.fontSize)}
          onChange={(e) =>
            onChange({ ...styles, fontSize: e.target.value + "px" })
          }
          className="w-full"
        />
      </div>

      <div>
        <label>📏 فاصله داخلی</label>
        <input
          type="text"
          value={styles.padding}
          onChange={(e) => onChange({ ...styles, padding: e.target.value })}
          className="w-full"
        />
      </div>
    </div>
  );
}