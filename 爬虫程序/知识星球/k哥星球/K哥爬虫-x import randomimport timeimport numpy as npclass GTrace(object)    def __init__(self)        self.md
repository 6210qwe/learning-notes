```
import random
import time

import numpy as np
class GTrace(object):
    def __init__(self):
        self.__pos_x = []
        self.__pos_y = []
        self.__pos_z = []

    def __polynomial_1(self,x):
        return x ** 3
    def __set_distance(self,_dist):
        """
        设置要生成的轨迹长度
        """
        #根据距离设置总用时大小
        if _dist < 130:
            __need_time = int(random.uniform(1000, 1300))
        else:
            __need_time = int(random.uniform(1300, 1400))

        return __need_time
    def __get_pos_y(self):

        _pos_y = [-19]
        point_count = len(self.__pos_z)
        zero_weight=2
        one_weight=1
        _pos_y.extend(random.choices([0, 1], weights=[zero_weight, one_weight], k=point_count-len(_pos_y)))
        return _pos_y

    def __get_pos_z(self,distance):
        self.__pos_z = []
        # 结束阶段轨迹时间
        __end_pt_time = []

        # 移动阶段轨迹时间
        __move_pt_time = []
        __need_time=self.__set_distance(distance)
        print(__need_time)
        total_move_time = __need_time * random.uniform(0.5, 0.65)
        # 设置第一轨迹点的开始时间
        start_point_time = random.uniform(70, 100)

        __start_pt_time = [0, 0, int(start_point_time)]
        sum_move_time = 0
        _tmp_total_move_time = total_move_time
        while True:
            delta_time = random.uniform(3, 8)
            if _tmp_total_move_time < delta_time:
                break
            # 偏移时间
            sum_move_time += delta_time
            # 剩下的时间
            _tmp_total_move_time -= delta_time
            __move_pt_time.append(int(start_point_time + sum_move_time))
        last_pt_time = __move_pt_time[-1]
        __move_pt_time.append(int(last_pt_time + _tmp_total_move_time))
        # 计算结束阶段第一个轨迹开始移动的时间
        sum_end_time = start_point_time + total_move_time
        #剩余点移动的时间
        other_point_time = __need_time - sum_end_time
        end_first_ptime = other_point_time / 2
        while True:
            delta_time = random.uniform(90, 250)
            if end_first_ptime - delta_time <= 0:
                break

            end_first_ptime -= delta_time
            sum_end_time += delta_time
            __end_pt_time.append(int(sum_end_time))

        __end_pt_time.append(int(sum_end_time + (other_point_time / 2 + end_first_ptime)))
        self.__pos_z.extend(__start_pt_time)
        self.__pos_z.extend(__move_pt_time)
        self.__pos_z.extend(__end_pt_time)
    @classmethod
    def scale_trajectory(self,trajectory, new_min, new_max):
        old_min = min(trajectory)
        old_max = max(trajectory)
        # 线性缩放
        scaled_trajectory = [(new_max - new_min) * (x - old_min) / (old_max - old_min) + new_min for x in trajectory]
        return scaled_trajectory
    # def scale_trajectory(self,trajectory, new_min, new_max):
    #     old_min = min(trajectory)
    #     old_max = max(trajectory)
    #     scaled_trajectory = []
    #
    #     # 线性缩放
    #     for x in trajectory:
    #        _x= (new_max - new_min) * (x - old_min) / (old_max - old_min) + new_min
    #        scaled_trajectory.append(_x)
    #
    #     return scaled_trajectory

    def get_slide_track(self,distance):
        if not isinstance(distance, int) or distance < 0:
            raise ValueError(f"distance类型必须是大于等于0的整数: distance: {distance}, type: {type(distance)}")
        first_track=random.randint(46,59)
        slide_track = [23,first_track]
        point_sum=len(self.__pos_z)
        point_count=point_sum - len(slide_track)
        # 创建时间序列
        t = np.linspace(-10, 4, point_count)
        # 计算轨迹
        trajectory_x = [self.__polynomial_1(x) for x in t]
        print(trajectory_x)
        # 缩放轨迹到指定范围
        target_min =first_track
        target_max = first_track + distance
        scaled_trajectory_x = self.scale_trajectory(trajectory_x, target_min, target_max)
        i = 0
        start_idx = int(point_sum / 10)
        end_idx = int(point_sum / 50)
        delta_pt = abs(np.random.normal(scale=1.1, size=point_sum - start_idx - end_idx))
        for idx in range(start_idx, point_sum):
            if idx * 1.3 > len(delta_pt):
                break

            scaled_trajectory_x[idx] += delta_pt[i]
            i += 1
        slide_track.extend(scaled_trajectory_x)
        return slide_track

    def get_mouse_pos_path(self,distance):
        """
        获取滑动滑块鼠标的滑动轨迹坐标集合
         """
        result = []
        self.__get_pos_z(distance)
        y = self.__get_pos_y()
        slide_track= self.get_slide_track(distance)
        for idx in range(len(slide_track)):
            result.append([int(slide_track[idx]), int(y[idx]), int(self.__pos_z[idx])])

        return result[-1],result

if __name__ == "__main__":
    trace = GTrace()
    # 示例使用
    for i in range(10):
        distance = random.randint(70, 150)
        print("长度为: %d , 坐标为: \n" % distance)
        distance, mouse_pos_path = trace.get_mouse_pos_path(distance)
        base_t = int(time.time()*1000)
        traces = []
        for i in mouse_pos_path:
            x, y, t = i
            x += 0
            y += 176
            t += base_t
            traces.append([str(x), str(y), t])
        print(mouse_pos_path)
        print(traces)
        print("轨迹大小", len(traces))

# t, scaled_trajectory_x = get_mouse_pos_path(distance)
# print(scaled_trajectory_x)
# import matplotlib.pyplot as plt
# x=[]
# y=[]
# for item_1 in scaled_trajectory_x:
#     x.append(item_1[2])
#     y.append(item_1[0])
# print(len(y))
# plt.plot(x, y)
# plt.xlabel('Time')
# plt.ylabel('Scaled Distance')
# plt.title('Scaled Slide Track')
# plt.show()
```