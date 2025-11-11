import numpy as np

def cubic_bezier(t, p0, p1, p2, p3):
    """计算三次贝塞尔曲线上的点，t 是参数（0 到 1）。"""
    return (1-t)**3 * p0 + 3*(1-t)**2 * t * p1 + 3*(1-t) * t**2 * p2 + t**3 * p3

def generate_trajectory(target_distance, num_points=100, base_y=260, time_scale=10):
    """
    生成贝塞尔曲线轨迹。
    参数：
        target_distance: 目标 x 距离长度
        num_points: 生成的点数（默认 100）
        base_y: 基础 y 坐标（默认 260）
        time_scale: 时间与距离的缩放因子（默认 10，单位：毫秒/单位距离）
    返回：
        轨迹点列表，格式为 [[x, y, t], ...]
    """
    # x 坐标的控制点：从 0 到 target_distance
    px0, px1, px2, px3 = 0, target_distance * 0.33, target_distance * 0.67, target_distance
    # y 坐标的控制点：保持在 base_y 附近
    py0, py1, py2, py3 = base_y, base_y + 1, base_y - 1, base_y
    # t（时间差）的控制点：基于距离动态计算
    total_time = target_distance * time_scale  # 总时间 = 距离 * 时间缩放因子
    pt0, pt1, pt2, pt3 = 0, total_time * 0.33, total_time * 0.67, total_time

    # 沿着贝塞尔曲线生成点
    t_values = np.linspace(0, 1, num_points)
    trajectory = []

    for t in t_values:
        # 使用贝塞尔曲线计算 x、y、t
        x = cubic_bezier(t, px0, px1, px2, px3)
        y = cubic_bezier(t, py0, py1, py2, py3) + np.random.normal(0, 0.5)  # y 添加微小扰动
        time = cubic_bezier(t, pt0, pt1, pt2, pt3)

        # 四舍五入到整数
        x = round(x)
        y = round(y)
        time = round(time)

        # 添加 [x, y, t] 到轨迹
        trajectory.append([x, y, time])

    return trajectory


# # 示例调用
# if __name__ == "__main__":
#     # 生成 x 距离为 150 的轨迹
#     trajectory = generate_trajectory(target_distance=68)
#     print("[")
#     for point in trajectory:
#         print(f"[{point[0]}, {point[1]}, {point[2]}],")
#     print("]")
