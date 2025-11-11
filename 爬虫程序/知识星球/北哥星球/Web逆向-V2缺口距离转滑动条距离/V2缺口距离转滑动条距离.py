def x1_to_x2(x1):
    if x1 <= 0:
        return 0
    x2_approx = 13.2 * (x1 ** 0.536)
    x2 = round(x2_approx)
    if int(x1) >= 200:
        return int(x2) + 1
    return int(x2)