import random
import time


def generate_human_like_trajectory(start_x, end_x, total_time, y_offset=0):
    """
    生成拟人化的滑动滑块轨迹，包含“滑过一点再拉回来”的特点，并在最后停留一段时间。

    Args:
        start_x (int): 起始X坐标。
        end_x (int): 结束X坐标。
        total_time (int): 总耗时（毫秒）。
        y_offset (int): Y坐标偏移量，默认为0。

    Returns:
        list: 包含 "x", "y", "relative_time" 的轨迹点列表。
    """
    trajectory = []
    current_x = start_x
    current_time = 0

    # 初始停顿
    initial_pause = random.randint(50, 200)
    trajectory.append({"x": start_x, "y": y_offset, "relative_time": 0})
    current_time += initial_pause

    # 计算总的滑动距离
    distance = end_x - start_x

    # 定义各个阶段的时间比例
    accelerate_ratio = 0.2
    uniform_ratio = 0.5
    overshoot_ratio = 0.1
    pullback_ratio = 0.1
    decelerate_ratio = 0.1
    final_pause_ratio = 0.1  # 新增：最后停留时间比例

    # 计算各个阶段的持续时间
    accelerate_duration = total_time * accelerate_ratio
    uniform_duration = total_time * uniform_ratio
    overshoot_duration = total_time * overshoot_ratio
    pullback_duration = total_time * pullback_ratio
    decelerate_duration = total_time * decelerate_ratio
    final_pause_duration = total_time * final_pause_ratio  # 新增：最后停留时间

    # 加速阶段
    target_time_accel = accelerate_duration
    while current_time < target_time_accel:
        progress = current_time / target_time_accel
        delta_x = distance * (progress ** 2)  # 二次函数加速
        current_x = start_x + int(delta_x)
        current_x += random.randint(-2, 2)  # 增加随机抖动
        trajectory.append({"x": current_x, "y": y_offset, "relative_time": int(current_time)})
        current_time += random.randint(10, 50)

    # 匀速阶段
    target_time_uniform = accelerate_duration + uniform_duration
    while current_time < target_time_uniform:
        progress = (current_time - accelerate_duration) / uniform_duration
        delta_x = distance * (accelerate_ratio + uniform_ratio * progress)  # 从加速结束的位置开始
        current_x = start_x + int(delta_x)
        current_x += random.randint(-1, 1)  # 增加随机抖动
        trajectory.append({"x": current_x, "y": y_offset, "relative_time": int(current_time)})
        current_time += random.randint(10, 40)
        if random.random() < 0.1:  # 随机停顿
            pause_duration = random.randint(50, 150)
            trajectory.append({"x": current_x, "y": y_offset, "relative_time": int(current_time + pause_duration)})
            current_time += pause_duration

    # 超出目标阶段 (滑过一点)
    overshoot_amount = random.randint(int(distance * 0.02), int(distance * 0.08))  # 超出距离为总距离的2%-8%
    target_x_overshoot = end_x + overshoot_amount

    target_time_overshoot = accelerate_duration + uniform_duration + overshoot_duration
    while current_time < target_time_overshoot:
        progress = (current_time - (accelerate_duration + uniform_duration)) / overshoot_duration
        current_x = start_x + int(distance * (accelerate_ratio + uniform_ratio)) + int(overshoot_amount * progress)
        current_x += random.randint(-2, 2)
        trajectory.append({"x": current_x, "y": y_offset, "relative_time": int(current_time)})
        current_time += random.randint(20, 60)

    # 拉回阶段
    target_time_pullback = accelerate_duration + uniform_duration + overshoot_duration + pullback_duration
    while current_time < target_time_pullback:
        progress = (current_time - (accelerate_duration + uniform_duration + overshoot_duration)) / pullback_duration
        current_x = target_x_overshoot - int(overshoot_amount * progress)
        current_x += random.randint(-2, 2)
        trajectory.append({"x": current_x, "y": y_offset, "relative_time": int(current_time)})
        current_time += random.randint(20, 60)

    # 减速阶段 (最后回到目标)
    target_time_decel = total_time - final_pause_duration  # 减去最后停留的时间
    while current_time < target_time_decel:
        progress = (current_time - (
                    accelerate_duration + uniform_duration + overshoot_duration + pullback_duration)) / decelerate_duration
        current_x = int(end_x * (1 - progress)) + int(end_x * progress)  # 简单线性回到end_x
        current_x += random.randint(-1, 1)
        trajectory.append({"x": current_x, "y": y_offset, "relative_time": int(current_time)})
        current_time += random.randint(10, 50)

    # 确保最后一个点是目标点
    trajectory.append({"x": end_x, "y": y_offset, "relative_time": int(target_time_decel)})

    # 最后停留阶段：x坐标不变，relative_time持续增加
    current_time_for_pause = int(target_time_decel)
    while current_time_for_pause < total_time:
        time_step = random.randint(50, 120)  # 每次停留50-150毫秒
        current_time_for_pause += time_step
        if current_time_for_pause > total_time:
            current_time_for_pause = total_time
        trajectory.append({"x": end_x, "y": y_offset, "relative_time": int(current_time_for_pause)})

    # 确保最后一个点是目标点和总时间
    trajectory.append({"x": end_x, "y": y_offset, "relative_time": total_time+11})
    trajectory.append({"x": end_x, "y": y_offset, "relative_time": total_time+36})
    trajectory.append({"x": end_x, "y": y_offset, "relative_time": total_time+79})
    # 移除重复的起始点（如果存在）
    if len(trajectory) > 1 and trajectory[0]["relative_time"] == trajectory[1]["relative_time"]:
        trajectory.pop(0)

    return trajectory


if __name__ == '__main__':
    # 模拟从X=0滑动到X=200，总耗时1000毫秒
    trajectory_data = generate_human_like_trajectory(11, 253, 2865)
    print(trajectory_data)

