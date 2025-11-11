import requests

cookies = {
    '__cf_bm': 'o4VSlFZRL7fLspOEY1jT1_RdKTWjRXm7TK.wyX_NUuQ-1754458153-1.0.1.1-xOS6tdPcy1VaW8DZ.kWFGNkjK8b.TgO.hEYzSHILne6JUa9Ud.Dq4BsxliFULsmvYx3YEHPP4Y3GEAViNxATIt6YD4_KDbcitnRV1W6z__4',
    '_cfuvid': 'hc82nGG5mPi1LTRofwuWbXgMDKkjZ7gQPCyRt7w.qqw-1754458154700-0.0.1.1-604800000',
    'cf_clearance': 'NRxGv53z67T8sCj0sljhFI8dcCctfPJu_gM2Ygyfikc-1754458160-1.2.1.1-14oDh7BvNDkPR9jp998zDLL1bXbFMsoRKY5quyVOBQ34lVYARFWBbKQaxGANLMBSaaBfq0SrQ8fjWbB5fYdzXlX7fkBLFa_abvsDWgDhAd1VMo.DdhEjYW6ejmyvg0Hj5RHqq009AADLCXbE9vCUTiCfK3FJ78OTo0x6so82_dScpnfHlUOW_EADyhBcPod1Oz_eqPrBdYtDhRjq7FJOW7gLHFGdVFePyT7foGdYCgo',
}

headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'cache-control': 'max-age=0',
    'content-type': 'application/x-www-form-urlencoded',
    'origin': 'https://al.espacenet.com',
    'priority': 'u=0, i',
    'referer': 'https://al.espacenet.com/?__cf_chl_tk=msx4ObSwdNuZam5raqBl7.8Y2nM3UstxWGXTizpCMsw-1754458153-1.0.1.1-JNQReVf5Bq26fRC1tQMT289aqzKmZfBknAnyP8JtVsc',
    'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Microsoft Edge";v="138"',
    'sec-ch-ua-arch': '"x86"',
    'sec-ch-ua-bitness': '"64"',
    'sec-ch-ua-full-version': '"138.0.3351.121"',
    'sec-ch-ua-full-version-list': '"Not)A;Brand";v="8.0.0.0", "Chromium";v="138.0.7204.184", "Microsoft Edge";v="138.0.3351.121"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-model': '""',
    'sec-ch-ua-platform': '"Windows"',
    'sec-ch-ua-platform-version': '"15.0.0"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0',
    # 'cookie': '__cf_bm=o4VSlFZRL7fLspOEY1jT1_RdKTWjRXm7TK.wyX_NUuQ-1754458153-1.0.1.1-xOS6tdPcy1VaW8DZ.kWFGNkjK8b.TgO.hEYzSHILne6JUa9Ud.Dq4BsxliFULsmvYx3YEHPP4Y3GEAViNxATIt6YD4_KDbcitnRV1W6z__4; _cfuvid=hc82nGG5mPi1LTRofwuWbXgMDKkjZ7gQPCyRt7w.qqw-1754458154700-0.0.1.1-604800000; cf_clearance=NRxGv53z67T8sCj0sljhFI8dcCctfPJu_gM2Ygyfikc-1754458160-1.2.1.1-14oDh7BvNDkPR9jp998zDLL1bXbFMsoRKY5quyVOBQ34lVYARFWBbKQaxGANLMBSaaBfq0SrQ8fjWbB5fYdzXlX7fkBLFa_abvsDWgDhAd1VMo.DdhEjYW6ejmyvg0Hj5RHqq009AADLCXbE9vCUTiCfK3FJ78OTo0x6so82_dScpnfHlUOW_EADyhBcPod1Oz_eqPrBdYtDhRjq7FJOW7gLHFGdVFePyT7foGdYCgo',
}

data = {
    '8e11f5e558a06ed01f1160b1be8c2b45bd4c21349826971078f7a21bc777ce31': 'IDK.4WC4SkEfaU24YSCM7WRhECeblRcFZPoNHK0laSY-1754458153-1.2.1.1-2Gdf31tGEoqkYxoWVJsBU8IxM5rP7IldbzkH1vjMRnZhsSvq7TqsFxQqyadLaso2VvsL242Ts_va0I3bB4P0LAwhoJY8NUU0w58u_bUIwKJQtwvsAqCm7JWPR6lWcYRVBR6o2yaopwyYAGcvEPuofVou6GCRluX8xz_A0.N5MqcjgqhS.KbmP4OLfvgc4lk0UwU_Cn76t2HxP0LU8PPcuOXCyKIVpgu77P3dWZXogfZlt1H1v2A0E36CWNcK6xQd_pIU7DeXAhC2nfL5LDOnHssAr4ILLAUHABl42ARE10FkMNXggAB4z9zWrnvqTNAuUr9z1F3or0eRQvgTYl1jc9ms42Hgyfqmg5L0pNPSnXa7Nb6IasSnK_mVvieobJDF9uIW1MK2B.VHd_iLG4yskfdhYWQs.EkrAn.ZZkMT9hWd.GKtgUbl6vctykNiDIRTcvIh3QVm7FEkUfVpDmjoZUTa7fcuUf46Nhp7wkHx3LBbN5TzmAPLk2SLM38iMJoTOLQRaU2bHMzytN9TlMbZuPOjGqXQ6cEr2f1uG0m6t64OND8WH4wKXGZenKIAweo6m960yh.Xe7r.S.QwcCC9mXwBLizwXN8AocvL74G12OaiqKwQwmlc27_PF.7POvUBTtAvuyt50LiwUNQiq9R6RvU3KaZyaWwv7hd3G7_00ISmpC0.viqpp4d_A6bU3ZzZJtoh6CYStdA8FWd7ACVfdr0DRedPYeDcAw2PS9oFv.n5jN2GVRPJSnNAA5pTYtzIawEE6UhPxE0fVL.n74_1jBTBezRthrMDxSYVNb1UO4e9kHJ1eDNS2YLXIb1pIIsrsieu2agHLokplPBklsZvZ.8SgXkV1GFd19jC90lYaMfe2uqrnXXvyRNR6sWFKFvB0EMeiZUF6ThQfXwRncW68WweWvXnmuh6f5yRNK_FH8kZpN3plCRVVLsvnxF6dVT9xEXxSe1JtghJIi9XErWbalc8ETGCIcz8jUq9hLXRdy_BOE5B7rkBywmCpnh0f3DYIP.wTS0AGXuvCJ6mD5XreGGl122alg8gpSDFz64OWPM',
    '7bf470e12e82b3d8774b871b6abbfd023f2b0fc871902bfe09bbe209469cea07': 'MknQNetYRMEgWHiEP2Ipojcj0S6l7DQtYK7VZCtsKRY-1754458153-1.2.1.1-1XWVroaEE1PGvfHTB_vp6p28K0B1m8zvDNdP_1YqcqFScBoxC6ckUeoYgPY2P.vCaMtl0V6t3_s_.bidj7G2wMwL2L7i6u192h9gOUNTq5CwTg3BugHwmTgXdYU8wd5tRT9uFCQjZLbEJvF1xPYAgXCW3t5RkcMW7Tiwi07tfHq0coh6o9_jpcp6ke9enW1r.JIHQ0XsPccLYVSZQRzAm6PKoSFMartYJTrnJTPZu4tMTwCnweDI5mfDdUFvEOG2M._dUhK0Yv_WvHVaTOfIKEpgDMPztdzv5X09gVTIj138HRMIFgZcflaYGTRxbTQHSc6aZMiBm5UnWKT0wDAeMzbrexpqCKFPwDzOb0K7zb9m8EkDE81KN5PLFb6IRGY7ml0rT.Yst_WEujOvbKDlF49zuEuy7lyh_RV7WjHnfpxiPr.8b8WifxACooh0Wq5u1k09MkdTgBjnPrECIcFUUhpNuiOTr2cmDvYPMcKV0itsBiyIBjI_8gKQzotBbCsRFZqw44l.giubwdijbE68iLDWPmou4nsgylOe56VSqHY9D.z2p8MYEiVoe5jsDhvDRoOtNIesH_Gs_b_9lZDdxqYLKMhrBshlaXyxLKt34dCKeu4GrmRVXvQTHEdb8Uw7gHSNVh2l.pVeZPS20_mlNcf8LR0._gDWOOtFxEoHI0kj_gHFY_yc51yliql_8xndyBg1NCz6kdx8fhY46fz5TjskH6xfsC5JdpmS5ANGN_OWSDaWVzU8iYCS3sEsadDxKYB8G_.JpqQtjiJqgb5smVMMhvZn3MVlXv7D5yv8w1StorkjDKxpYANeW3NaAYq_kAJde5jq1V2Oe0jvXLggPYRIX4KG9k78..t6bBpaISi3caSkqA7wrkdLJGuzNr.2Xsy3E5WY6Ga9ynhbY69SqUc3zcrn71qETlIQ9a7cf7dc.lRLuZSkgbZYt2GB40G2Yi.wyFDWHJAhjq0AsUrj69ZUvWWqOk1VZ..u7BJHe48yWV3jb8uIvuIHd3ZkDIP.Tl6SVEjObnOpcIC14xJKlhGj_iGzgFu_ZTRNnq6AHuW.A1UPtuxOKQa.qIoKEZFnAIuLiTe6S9Lxu4Z1kUMf.vFHkey90fR4_IyZ_3gPEIBvHy8J931fyFHdDk6YW5YBK4h5vcj7siLvbPprjcNsvc1zP9w76mv1GhQKqynFzMb.oDxL0GhzivMIpNS1RINEaMEcUgRxxRlccUoajWcKFsdx4UraxA1WhzyvIeINTTD1BctwsIMFowJgtMFNrSKJ6rqh60mXLLEPdPFq2C4WYgnGKEctrQ605X_hMJsPjORBLJSrY4EocSiq05OCItyEt1butgWXP.R0VZVUlmqX3S7IldGwhMQSxgVs1CotskigIdl15WEVhV9b5J6gcyrlM6FViAa5PN4G6dhrEsKWVCBf_7KjbnTgT3ql3uiUX5X64mSI_VCPDwH2gPXokhyi05Kin0UPT03hsgyYrOzMj6flH58JA0CkhW_jssFr3oSZtlH.zcdTLVDAq04BGzW0HX.C_BkMGt9zRUVP5926_orPN7Uq0gZ_CyJ_.v4uRCxgvt0L1_LQOvTMPXACuPqMpBbzCei9TQ1p2aALRXKa4ZmWPEf3iy32l9khKSyvJyofdSGF0sS4dnNhW_2mliURqTZayxFBu2ccExoxpM.HS_7UA6NK8kzSgzZgKZ5YsJ_DpTtaiZa53dLHM2fw8zPlZJpYEdU3cBBQrfYzmKvSBDlkoyEiYdx8eZQqwF4ZV3ymztJPsUVyuLoLayviOVgevG9J5yJf4BoImaS80lbIHx7tDlHs2fAPjuOZv07YUDsnRPU96QKK9BIrGff8GtMwP0sRrUBIPAx35ng9iEXdaxEHSPsXevg.SgC.GR0zuqsh2TtWCxIrDyuOpNOJR74xlfoTjGiCvH3EkWoR5QQ3fxiwesz.48vbL6Oe8hECI_7dhvbiTcGR73yQasg1mQEirRSDgZP0NVg6qk3yhqPAhvCIAjpzkB9PuR8iK8syGbOJZQ2C8bKi3wh0K5weltWyurqzfIG_qfxs.FemX5uCcE54xZZFxnwa8zH21mjJ.oUw4hJQY0OrvwFTp6y3IFztjNW_i.5oSWTGkZOPRUSTtNYSjt1rlV28GcHtc7J5eOcAn9n_r2GlI0Jvn85A7WqcnVrZe7ZxRBRleOdRk7oV0C3bWmWgya7mS4Agiv1eV0pEydUJxGVfpHhg6PrZnBU1xG684NyyOoK5IEOV9GqCv1a1zMfjVjDI.T7TA_6X.OmieHnA251SgAOApjwk5qS_hxpSNputAOG10NQ6f.aIFlMO48W9XsLP4A3CYVmZGPwhCRvmnUQ.TaVV8iMVRJ.s3iIHHqfKt_ZdnB_8xjLod_2jwqGBA0dzUFjSjDOELprl0n2Y3K_fkDvhbdMbVfMJAxxoipG0o1q7YKNEBmUfINbfydEKT05ZtCmCG6Vn3n53NO2mYBz7WH22_Gp2SaIEWlmlQy4XfKOxWnUT95IPU6ClV5LhU7gzQ9fAAQn6rgs2CRxZOPOT3m2HlvlG2gcqxt9MnDe2vwBjryYDoTFLHLHL_8VdTCwrZiVrOLzSN9OdNfCQ0mQTkc1eQykLT5H8dRlMdzVa5gqzol4alnT.iVjVcgcqWaFDBK0WjUSOj2e7XGNELVCKdAHHkL0tcQE10TpCJpU.MgE_U6v5dN7IwpAmEII2U9qZKQlxfENm.SHdWDsAY5_gejX4Ar_db_rYQtNSsaN2tNNt5_fHFhiF.PyGzhBy7yeU9dEiKqHtTg.rkPU7uaVHsVBau_QjJZZ45aK5cDPenE2KKx2XmokPDw',
    'f656c539a8f9f19d3ba612fbaeb76e546ccaf619cae7e3eb2cceb8065812a11c': 'YcPFNwfQL3dJEisCafY9PQhc9g0HGsSQABHtqUE5OfY-1754458160-1.0.1.1-KpbKJrSYLSJrGkcTUvVLDp177k1gsIJzUzKcf3O6CLq1mj3EvmFYj5OJ2EawXCUzq3a8ZHLPcbkOvDgLSGSL6WEWNt1jqhwt93dJ3qnQbJsZuwERKm.5memZDLIkoPjUvMRuZbgfaKO_1LUpqjKKdert_Rt7MnSlvaY9_JhobZ9UTyEu.Ca0tu0lv813lHmt',
}

response = requests.post('https://al.espacenet.com/', cookies=cookies, headers=headers, data=data)
print(response.text)