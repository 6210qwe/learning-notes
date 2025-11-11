
CREATE TABLE domestic_medical_devices_registration (
    -- 注册证编号，主键
    registration_id VARCHAR(50) NOT NULL COMMENT '注册证编号',
    -- 注册人名称
    registrant_name VARCHAR(255) NULL DEFAULT NULL COMMENT '注册人名称',
    -- 注册人住所
    registrant_address VARCHAR(255) NULL DEFAULT NULL COMMENT '注册人住所',
    -- 生产地址
    production_address VARCHAR(255) NULL DEFAULT NULL COMMENT '生产地址',
    -- 产品名称
    product_name VARCHAR(255) NULL DEFAULT NULL COMMENT '产品名称',
    -- 管理类别
    management_category VARCHAR(50) NULL DEFAULT NULL COMMENT '管理类别',
    -- 型号规格
    model_specification TEXT NULL DEFAULT NULL COMMENT '型号规格',
    -- 结构及组成/主要组成成分
    product_composition TEXT NULL DEFAULT NULL COMMENT '结构及组成/主要组成成分',
    -- 适用范围/预期用途
    application_scope TEXT NULL DEFAULT NULL COMMENT '适用范围/预期用途',
    -- 产品储存条件及有效期
    storage_conditions TEXT COMMENT '产品储存条件及有效期',
    -- 附件
    attachments TEXT COMMENT '附件',
    -- 其他内容
    other_content TEXT COMMENT '其他内容',
    -- 备注
    remarks TEXT COMMENT '备注',
    -- 审批部门
    approval_department VARCHAR(255) NULL DEFAULT NULL COMMENT '审批部门',
    -- 批准日期
    approval_date DATE NULL DEFAULT NULL COMMENT '批准日期',
    -- 生效日期
    effective_date DATE NULL DEFAULT NULL COMMENT '生效日期',
    -- 有效期至
    expiration_date DATE NULL DEFAULT NULL COMMENT '有效期至',
    -- 变更情况
    change_situation TEXT COMMENT '变更情况',
    PRIMARY KEY (registration_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='境内医疗器械（注册）';



CREATE TABLE domestic_medical_devices_registration_history_data (
    -- 注册证编号，主键
    registration_id VARCHAR(50) NOT NULL COMMENT '注册证编号',
    -- 注册人名称
    registrant_name VARCHAR(255) NULL DEFAULT NULL COMMENT '注册人名称',
    -- 注册人住所
    registrant_address VARCHAR(255) NULL DEFAULT NULL COMMENT '注册人住所',
    -- 生产地址
    production_address VARCHAR(255) NULL DEFAULT NULL COMMENT '生产地址',
    -- 产品名称
    product_name VARCHAR(255) NULL DEFAULT NULL COMMENT '产品名称',
    -- 管理类别
    management_category VARCHAR(50) NULL DEFAULT NULL COMMENT '管理类别',
    -- 型号规格
    model_specification TEXT NOT NULL COMMENT '型号规格',
    -- 结构及组成/主要组成成分
    product_composition TEXT NOT NULL COMMENT '结构及组成/主要组成成分',
    -- 适用范围/预期用途
    application_scope TEXT NOT NULL COMMENT '适用范围/预期用途',
    -- 产品储存条件及有效期
    storage_conditions TEXT COMMENT '产品储存条件及有效期',
    -- 附件
    attachments TEXT COMMENT '附件',
    -- 其他内容
    other_content TEXT COMMENT '其他内容',
    -- 备注
    remarks TEXT COMMENT '备注',
    -- 审批部门
    approval_department VARCHAR(255) NULL DEFAULT NULL COMMENT '审批部门',
    -- 批准日期
    approval_date DATE NULL DEFAULT NULL COMMENT '批准日期',
    -- 生效日期
    effective_date DATE NULL DEFAULT NULL COMMENT '生效日期',
    -- 有效期至
    expiration_date DATE NULL DEFAULT NULL COMMENT '有效期至',
    -- 变更情况
    change_situation TEXT COMMENT '变更情况',
    PRIMARY KEY (registration_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='境内医疗器械（注册历史数据）';


CREATE TABLE domestic_medical_devices_filing (
    -- 备案号，主键，唯一标识
    record_id VARCHAR(50) NOT NULL COMMENT '备案号',
    -- 备案人名称
    record_holder_name VARCHAR(255) NULL DEFAULT NULL COMMENT '备案人名称',
    -- 备案人注册地址
    record_holder_registered_address VARCHAR(255) NULL DEFAULT NULL COMMENT '备案人注册地址',
    -- 生产地址
    production_address VARCHAR(255) NULL DEFAULT NULL COMMENT '生产地址',
    -- 产品名称/产品分类名称
    product_name VARCHAR(255) NULL DEFAULT NULL COMMENT '产品名称/产品分类名称',
    -- 型号规格/包装规格
    model_specification VARCHAR(1024) NULL DEFAULT NULL COMMENT '型号规格/包装规格',
    -- 产品描述/主要组成成分
    product_description TEXT NULL DEFAULT NULL COMMENT '产品描述/主要组成成分',
    -- 预期用途
    intended_use TEXT NULL DEFAULT NULL COMMENT '预期用途',
    -- 产品存储及有效期
    storage_and_validity_period TEXT COMMENT '产品存储及有效期',
    -- 备注
    remarks TEXT COMMENT '备注',
    -- 备案单位
    record_unit VARCHAR(255) NULL DEFAULT NULL COMMENT '备案单位',
    -- 备案日期
    record_date DATE NULL DEFAULT NULL COMMENT '备案日期',
    change_situation TEXT COMMENT '变更情况',

    PRIMARY KEY (record_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='境内医疗器械（备案）数据表';


CREATE TABLE domestic_medical_devices_filing_history_data (
    -- 备案号，主键，唯一标识
    record_id VARCHAR(50) NOT NULL COMMENT '备案号',
    -- 备案人名称
    record_holder_name VARCHAR(255) NULL DEFAULT NULL COMMENT '备案人名称',
    -- 备案人注册地址
    record_holder_registered_address VARCHAR(255) NULL DEFAULT NULL COMMENT '备案人注册地址',
    -- 生产地址
    production_address VARCHAR(255) NULL DEFAULT NULL COMMENT '生产地址',
    -- 产品名称/产品分类名称
    product_name VARCHAR(255) NULL DEFAULT NULL COMMENT '产品名称/产品分类名称',
    -- 型号规格/包装规格
    model_specification VARCHAR(1024) NULL DEFAULT NULL COMMENT '型号规格/包装规格',
    -- 产品描述/主要组成成分
    product_description TEXT NULL DEFAULT NULL COMMENT '产品描述/主要组成成分',
    -- 预期用途
    intended_use TEXT NULL DEFAULT NULL COMMENT '预期用途',
    -- 产品存储及有效期
    storage_and_validity_period TEXT COMMENT '产品存储及有效期',
    -- 备注
    remarks TEXT COMMENT '备注',
    -- 备案单位
    record_unit VARCHAR(255) NULL DEFAULT NULL COMMENT '备案单位',
    -- 备案日期
    record_date DATE NULL DEFAULT NULL COMMENT '备案日期',
    change_situation TEXT COMMENT '变更情况',

    PRIMARY KEY (record_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='境内医疗器械（备案历史数据）数据表';

CREATE TABLE imported_medical_devices_registration (
    -- 注册证编号，主键
    registration_id VARCHAR(50) NOT NULL COMMENT '注册证编号',
    -- 注册人名称
    registrant_name VARCHAR(255) NULL DEFAULT NULL COMMENT '注册人名称',
    -- 注册人住所
    registrant_address VARCHAR(255) NULL DEFAULT NULL COMMENT '注册人住所',
    -- 生产地址
    production_address VARCHAR(255) NULL DEFAULT NULL COMMENT '生产地址',
    -- 代理人名称
    agent_name VARCHAR(255) NULL DEFAULT NULL COMMENT '代理人名称',
    -- 代理人住所
    agent_address VARCHAR(255) NULL DEFAULT NULL COMMENT '代理人住所',
    -- 产品名称
    product_name VARCHAR(255) NULL DEFAULT NULL COMMENT '产品名称',
    -- 管理类别
    management_category VARCHAR(50) NULL DEFAULT NULL COMMENT '管理类别',
    -- 型号规格
    model_specification VARCHAR(1024) NULL DEFAULT NULL COMMENT '型号规格',
    -- 结构及组成/主要组成成分
    product_composition TEXT NULL DEFAULT NULL COMMENT '结构及组成/主要组成成分',
    -- 适用范围/预期用途
    application_scope TEXT NULL DEFAULT NULL COMMENT '适用范围/预期用途',
    -- 产品储存条件及有效期
    storage_conditions TEXT COMMENT '产品储存条件及有效期',
    -- 附件
    attachments TEXT COMMENT '附件',
    -- 其他内容
    other_content TEXT COMMENT '其他内容',
    -- 备注
    remarks TEXT COMMENT '备注',
    -- 审批部门
    approval_department VARCHAR(255) NOT NULL COMMENT '审批部门',
    -- 批准日期
    approval_date DATE NULL DEFAULT NULL COMMENT '批准日期',
    -- 生效日期
    effective_date DATE NULL DEFAULT NULL COMMENT '生效日期',
    -- 有效期至
    expiration_date DATE NULL DEFAULT NULL COMMENT '有效期至',
    -- 变更情况
    change_situation TEXT COMMENT '变更情况',
    PRIMARY KEY (registration_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='进口医疗器械（注册）';


CREATE TABLE imported_medical_devices_registration_history_data (
    -- 注册证编号，主键
    registration_id VARCHAR(50) NOT NULL COMMENT '注册证编号',
    -- 注册人名称
    registrant_name VARCHAR(255) NULL DEFAULT NULL COMMENT '注册人名称',
    -- 注册人住所
    registrant_address VARCHAR(255) NULL DEFAULT NULL COMMENT '注册人住所',
    -- 生产地址
    production_address VARCHAR(255) NULL DEFAULT NULL COMMENT '生产地址',
    -- 代理人名称
    agent_name VARCHAR(255) NULL DEFAULT NULL COMMENT '代理人名称',
    -- 代理人住所
    agent_address VARCHAR(255) NULL DEFAULT NULL COMMENT '代理人住所',
    -- 产品名称
    product_name VARCHAR(255) NULL DEFAULT NULL COMMENT '产品名称',
    -- 管理类别
    management_category VARCHAR(50) NULL DEFAULT NULL COMMENT '管理类别',
    -- 型号规格
    model_specification VARCHAR(1024) NULL DEFAULT NULL COMMENT '型号规格',
    -- 结构及组成/主要组成成分
    product_composition TEXT NULL DEFAULT NULL COMMENT '结构及组成/主要组成成分',
    -- 适用范围/预期用途
    application_scope TEXT NULL DEFAULT NULL COMMENT '适用范围/预期用途',
    -- 产品储存条件及有效期
    storage_conditions TEXT COMMENT '产品储存条件及有效期',
    -- 附件
    attachments TEXT COMMENT '附件',
    -- 其他内容
    other_content TEXT COMMENT '其他内容',
    -- 备注
    remarks TEXT COMMENT '备注',
    -- 审批部门
    approval_department VARCHAR(255) NULL DEFAULT NULL COMMENT '审批部门',
    -- 批准日期
    approval_date DATE NULL DEFAULT NULL COMMENT '批准日期',
    -- 生效日期
    effective_date DATE NULL DEFAULT NULL COMMENT '生效日期',
    -- 有效期至
    expiration_date DATE NULL DEFAULT NULL COMMENT '有效期至',
    -- 变更情况
    change_situation TEXT COMMENT '变更情况',
    PRIMARY KEY (registration_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='进口医疗器械（注册历史数据）';


CREATE TABLE imported_medical_devices_filing (
    -- 备案号，主键
    record_id VARCHAR(50) NOT NULL COMMENT '备案号',
    -- 备案人名称
    record_holder_name VARCHAR(255) NULL DEFAULT NULL COMMENT '备案人名称',
    -- 备案人注册地址
    record_holder_registered_address VARCHAR(255) NULL DEFAULT NULL COMMENT '备案人注册地址',
    -- 生产地址
    production_address VARCHAR(255) NULL DEFAULT NULL COMMENT '生产地址',
    -- 代理人名称
    agent_name VARCHAR(255) COMMENT '代理人名称',
    -- 代理人注册地址
    agent_registered_address VARCHAR(255) NULL DEFAULT NULL COMMENT '代理人注册地址',
    -- 产品名称/产品分类名称
    product_name VARCHAR(255) NULL DEFAULT NULL COMMENT '产品名称/产品分类名称',
    -- 型号规格/包装规格
    model_specification VARCHAR(1024) NULL DEFAULT NULL COMMENT '型号规格/包装规格',
    -- 产品描述/主要组成成分
    product_description TEXT NULL DEFAULT NULL COMMENT '产品描述/主要组成成分',
    -- 预期用途
    intended_use TEXT NULL DEFAULT NULL COMMENT '预期用途',
    -- 产品存储及有效期
    storage_and_validity_period TEXT COMMENT '产品存储及有效期',
    -- 备注
    remarks TEXT NULL DEFAULT NULL COMMENT '备注',
    -- 备案单位
    record_unit VARCHAR(255) NULL DEFAULT NULL COMMENT '备案单位',
    -- 备案日期
    record_date DATE NULL DEFAULT NULL COMMENT '备案日期',
    -- 变更情况
    change_situation TEXT NULL DEFAULT NULL COMMENT '变更情况',
    PRIMARY KEY (record_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='进口医疗器械（备案）';


CREATE TABLE imported_medical_devices_filing_history_data (
    -- 备案号，主键
    record_id VARCHAR(50) NOT NULL COMMENT '备案号',
    -- 备案人名称
    record_holder_name VARCHAR(255) NULL DEFAULT NULL COMMENT '备案人名称',
    -- 备案人注册地址
    record_holder_registered_address VARCHAR(255) NULL DEFAULT NULL COMMENT '备案人注册地址',
    -- 生产地址
    production_address VARCHAR(255) NULL DEFAULT NULL COMMENT '生产地址',
    -- 代理人名称
    agent_name VARCHAR(255) NULL DEFAULT NULL COMMENT '代理人名称',
    -- 代理人注册地址
    agent_registered_address VARCHAR(255) NULL DEFAULT NULL COMMENT '代理人注册地址',
    -- 产品名称/产品分类名称
    product_name VARCHAR(255) NULL DEFAULT NULL COMMENT '产品名称/产品分类名称',
    -- 型号规格/包装规格
    model_specification VARCHAR(1024) NULL DEFAULT NULL COMMENT '型号规格/包装规格',
    -- 产品描述/主要组成成分
    product_description TEXT NULL DEFAULT NULL COMMENT '产品描述/主要组成成分',
    -- 预期用途
    intended_use TEXT NULL DEFAULT NULL COMMENT '预期用途',
    -- 产品存储及有效期
    storage_and_validity_period TEXT  NULL DEFAULT NULL COMMENT '产品存储及有效期',
    -- 备注
    remarks TEXT NULL DEFAULT NULL COMMENT '备注',
    -- 备案单位
    record_unit VARCHAR(255) NULL DEFAULT NULL COMMENT '备案单位',
    -- 备案日期
    record_date DATE NULL DEFAULT NULL COMMENT '备案日期',
    -- 变更情况
    change_situation TEXT COMMENT '变更情况',
    PRIMARY KEY (record_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='进口医疗器械（备案历史数据）';


CREATE TABLE medical_device_production_enterprises_licensing (
    -- 许可证编号，主键
    license_id VARCHAR(50) NOT NULL COMMENT '许可证编号',
    -- 企业名称
    company_name VARCHAR(255) NULL DEFAULT NULL COMMENT '企业名称',
    -- 法定代表人
    legal_representative VARCHAR(255) NULL DEFAULT NULL COMMENT '法定代表人',
    -- 企业负责人
    company_principal VARCHAR(255) NULL DEFAULT NULL COMMENT '企业负责人',
    -- 住所
    address VARCHAR(255) NULL DEFAULT NULL COMMENT '住所',
    -- 生产地址
    production_address VARCHAR(255) NULL DEFAULT NULL COMMENT '生产地址',
    -- 生产范围
    production_scope VARCHAR(255) NULL DEFAULT NULL COMMENT '生产范围',
    -- 发证部门
    issuing_authority VARCHAR(255) NULL DEFAULT NULL COMMENT '发证部门',
    -- 发证日期
    issue_date DATE NULL DEFAULT NULL COMMENT '发证日期',
    -- 有效期限
    expiration_date DATE NULL DEFAULT NULL COMMENT '有效期限',
    PRIMARY KEY (license_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='医疗器械生产企业（许可）';


CREATE TABLE medical_device_operating_enterprises_licensing (
    -- 许可证编号，主键
    license_id VARCHAR(50) NOT NULL COMMENT '许可证编号',
    -- 企业名称
    company_name VARCHAR(255) NULL DEFAULT NULL COMMENT '企业名称',
    -- 法定代表人
    legal_representative VARCHAR(255) NULL DEFAULT NULL COMMENT '法定代表人',
    -- 企业负责人
    company_principal VARCHAR(255) NULL DEFAULT NULL COMMENT '企业负责人',
    -- 住所
    address VARCHAR(255) NULL DEFAULT NULL COMMENT '住所',
    -- 经营场所
    business_address VARCHAR(255) NULL DEFAULT NULL COMMENT '经营场所',
    -- 经营方式
    business_mode VARCHAR(255) NULL DEFAULT NULL COMMENT '经营方式',
    -- 经营范围
    business_scope TEXT NULL DEFAULT NULL COMMENT '经营范围',
    -- 库房地址
    warehouse_address VARCHAR(255) NULL DEFAULT NULL COMMENT '库房地址',
    -- 发证部门
    issuing_authority VARCHAR(255) NULL DEFAULT NULL COMMENT '发证部门',
    -- 发证日期
    issue_date DATE NULL DEFAULT NULL COMMENT '发证日期',
    -- 有效期限
    expiration_date DATE NULL DEFAULT NULL COMMENT '有效期限',
    PRIMARY KEY (license_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='医疗器械经营企业（许可）';


CREATE TABLE medical_device_production_enterprises_filing (
    -- 备案凭证编号，主键
    record_id VARCHAR(50) NOT NULL COMMENT '备案凭证编号',
    -- 企业名称
    company_name VARCHAR(255) NULL DEFAULT NULL COMMENT '企业名称',
    -- 法定代表人
    legal_representative VARCHAR(255) NULL DEFAULT NULL COMMENT '法定代表人',
    -- 企业负责人
    company_principal VARCHAR(255) NULL DEFAULT NULL COMMENT '企业负责人',
    -- 住所
    address VARCHAR(255) NULL DEFAULT NULL COMMENT '住所',
    -- 生产地址
    production_address VARCHAR(255) NULL DEFAULT NULL COMMENT '生产地址',
    -- 生产范围
    production_scope TEXT NULL DEFAULT NULL COMMENT '生产范围',
    -- 备案部门
    record_department VARCHAR(255) NULL DEFAULT NULL COMMENT '备案部门',
    -- 备案日期
    record_date DATE NULL DEFAULT NULL COMMENT '备案日期',
    PRIMARY KEY (record_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='医疗器械生产企业（备案）';


CREATE TABLE medical_device_operating_enterprises_filing (
    -- 编号，主键
    id VARCHAR(50) NOT NULL COMMENT '编号',
    -- 企业名称
    company_name VARCHAR(255) NULL DEFAULT NULL COMMENT '企业名称',
    -- 法定代表人
    legal_representative VARCHAR(255) NULL DEFAULT NULL COMMENT '法定代表人',
    -- 企业负责人
    company_principal VARCHAR(255) NULL DEFAULT NULL COMMENT '企业负责人',
    -- 住所
    address VARCHAR(255) NULL DEFAULT NULL COMMENT '住所',
    -- 经营场所
    business_address VARCHAR(255) NULL DEFAULT NULL COMMENT '经营场所',
    -- 经营方式
    business_mode VARCHAR(255) NULL DEFAULT NULL COMMENT '经营方式',
    -- 经营范围
    business_scope TEXT NULL DEFAULT NULL COMMENT '经营范围',
    -- 库房地址
    warehouse_address VARCHAR(255) NULL DEFAULT NULL COMMENT '库房地址',
    -- 备案部门
    record_department VARCHAR(255) NULL DEFAULT NULL COMMENT '备案部门',
    -- 备案日期
    record_date DATE NULL DEFAULT NULL COMMENT '备案日期',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='医疗器械经营企业（备案）';


CREATE TABLE medical_device_standards_catalogue (
    -- 标准编号，主键
    standard_id VARCHAR(50) NOT NULL COMMENT '标准编号',
    -- 标准名称
    standard_name VARCHAR(255) NULL DEFAULT NULL COMMENT '标准名称',
    -- 归口单位
    responsible_unit VARCHAR(255) NULL DEFAULT NULL COMMENT '归口单位',
    -- 一致性程度标识
    consistency_identification VARCHAR(255) NULL DEFAULT NULL COMMENT '一致性程度标识',
    -- 代替号
    replacement_number VARCHAR(255) NULL DEFAULT NULL COMMENT '代替号',
    -- 实施日期
    implementation_date DATE NULL DEFAULT NULL COMMENT '实施日期',
    -- 发布日期
    release_date DATE NULL DEFAULT NULL COMMENT '发布日期',
    -- 是否为国际标准
    international_standard VARCHAR(255) NULL DEFAULT NULL COMMENT '国际标准',
    PRIMARY KEY (standard_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='医疗器械标准目录';


CREATE TABLE medical_device_classification_catalogue (
    -- 产品类别
    product_category VARCHAR(255) NOT NULL COMMENT '产品类别',
    -- 一级类别
    first_level_category VARCHAR(255) NULL DEFAULT NULL COMMENT '一级类别',
    -- 二级类别
    second_level_category VARCHAR(255) NULL DEFAULT NULL COMMENT '二级类别',
    -- 产品描述
    product_description TEXT NULL DEFAULT NULL COMMENT '产品描述',
    -- 预期用途
    intended_use TEXT NULL DEFAULT NULL COMMENT '预期用途',
    -- 品名举例
    product_examples TEXT NULL DEFAULT NULL COMMENT '品名举例',
    -- 管理类别
    management_category VARCHAR(50) NULL DEFAULT NULL COMMENT '管理类别',
    PRIMARY KEY (product_category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='医疗器械分类目录';



CREATE TABLE in_vitro_diagnostic_reagents_classification_sub (
    -- 分类编码，主键
    classification_code VARCHAR(50) NOT NULL COMMENT '分类编码',
    -- 管理类别
    management_category VARCHAR(50) NULL DEFAULT NULL COMMENT '管理类别',
    -- 产品分类
    product_classification VARCHAR(255) NULL DEFAULT NULL COMMENT '产品分类',
    -- 产品分类名称
    product_classification_name VARCHAR(255) NULL DEFAULT NULL COMMENT '产品分类名称',
    -- 预期用途
    intended_use TEXT NULL DEFAULT NULL COMMENT '预期用途',
    -- 目录版本
    catalog_version VARCHAR(20) NULL DEFAULT NULL COMMENT '目录版本',
    PRIMARY KEY (classification_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='体外诊断试剂分类子目录（2013版）';



CREATE TABLE disposable_medical_device_products (
    -- 注册证编号/备案号，主键
    registration_id VARCHAR(50) NOT NULL COMMENT '注册证编号/备案号',
    -- 注册人/备案人名称
    registrant_name VARCHAR(255) NULL DEFAULT NULL COMMENT '注册人/备案人名称',
    -- 注册人住所/备案人注册地址
    registrant_address VARCHAR(255) NULL DEFAULT NULL COMMENT '注册人住所/备案人注册地址',
    -- 生产地址
    production_address VARCHAR(255) NULL DEFAULT NULL COMMENT '生产地址',
    -- 代理人名称
    agent_name VARCHAR(255) NULL DEFAULT NULL COMMENT '代理人名称',
    -- 代理人注册地址
    agent_registered_address VARCHAR(255) NULL DEFAULT NULL COMMENT '代理人注册地址',
    -- 产品名称
    product_name VARCHAR(255) NULL DEFAULT NULL COMMENT '产品名称',
    -- 管理类别
    management_category VARCHAR(50) NULL DEFAULT NULL COMMENT '管理类别',
    -- 型号规格
    model_specification VARCHAR(1024) NULL DEFAULT NULL COMMENT '型号规格',
    -- 结构及组成/产品描述
    product_description TEXT NULL DEFAULT NULL COMMENT '结构及组成/产品描述',
    -- 适用范围/预期用途
    application_scope TEXT NULL DEFAULT NULL COMMENT '适用范围/预期用途',
    -- 附件
    attachments TEXT NULL DEFAULT NULL COMMENT '附件',
    -- 其他内容
    other_content TEXT NULL DEFAULT NULL COMMENT '其他内容',
    -- 备注
    remarks TEXT NULL DEFAULT NULL COMMENT '备注',
    -- 审批部门/备案单位
    approval_department VARCHAR(255) NULL DEFAULT NULL COMMENT '审批部门/备案单位',
    -- 批准/备案日期
    approval_date DATE NULL DEFAULT NULL COMMENT '批准/备案日期',
    -- 有效期至
    expiration_date DATE NULL DEFAULT NULL COMMENT '有效期至',
    -- 变更情况
    change_situation TEXT NULL DEFAULT NULL COMMENT '变更情况',
    PRIMARY KEY (registration_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='一次性使用医疗器械产品';

CREATE TABLE medical_device_network_trading_service_third_party_platform (
    -- 企业名称，主键
    company_name VARCHAR(255) NOT NULL COMMENT '企业名称',
    -- 法定代表人
    legal_representative VARCHAR(255) NULL DEFAULT NULL COMMENT '法定代表人',
    -- 主要负责人
    main_principal VARCHAR(255) NULL DEFAULT NULL COMMENT '主要负责人',
    -- 网站名称
    website_name VARCHAR(255) NULL DEFAULT NULL COMMENT '网站名称',
    -- 网络客户端应用程序名
    app_name VARCHAR(255) NULL DEFAULT NULL COMMENT '网络客户端应用程序名',
    -- 网站域名
    website_domain VARCHAR(255) NULL DEFAULT NULL COMMENT '网站域名',
    -- 网站IP地址
    website_ip VARCHAR(255) NULL DEFAULT NULL COMMENT '网站IP地址',
    -- 医疗器械网络交易服务第三方平台备案凭证编号
    medical_device_platform_id VARCHAR(50) NULL DEFAULT NULL COMMENT '医疗器械网络交易服务第三方平台备案凭证编号',
    -- 电信业务经营许可证或者非经营性互联网信息服务备案编号
    telecom_business_id VARCHAR(50) NULL DEFAULT NULL COMMENT '电信业务经营许可证或者非经营性互联网信息服务备案编号',
    -- 备注
    remarks TEXT COMMENT '备注',
    PRIMARY KEY (company_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='医疗器械网络交易服务第三方平台';


CREATE TABLE medical_device_compulsory_industry_standards (
    -- 标准名称
    standard_name VARCHAR(255) NOT NULL COMMENT '标准名称',
    -- 标准编号，主键
    standard_id VARCHAR(50) NOT NULL COMMENT '标准编号',
    -- 标准状态
    standard_status VARCHAR(20) NULL DEFAULT NULL COMMENT '标准状态',
    PRIMARY KEY (standard_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='医疗器械强制性行业标准';


CREATE TABLE institution_basic_info (
    id INT AUTO_INCREMENT NOT NULL COMMENT '自增ID',
    -- 备案号，主键
    registration_id VARCHAR(50) NOT NULL COMMENT '备案号',
    area_name VARCHAR(20) NULL DEFAULT NULL COMMENT '省份/地区',
    -- 机构名称
    institution_name VARCHAR(255) NULL DEFAULT NULL COMMENT '机构名称',
    -- 机构级别
    institution_level VARCHAR(255) NULL DEFAULT NULL COMMENT '机构级别',
    -- 地址
    address VARCHAR(255) NULL DEFAULT NULL COMMENT '地址',
    -- 联系人
    contact_person VARCHAR(255) NULL DEFAULT NULL COMMENT '联系人',
    -- 联系方式
    contact_info VARCHAR(50) NULL DEFAULT NULL COMMENT '联系方式',
    -- 备案时间
    record_time DATE NULL DEFAULT NULL COMMENT '备案时间',
    -- 备案状态
    record_status VARCHAR(10) NULL DEFAULT NULL COMMENT '备案状态',
    PRIMARY KEY (id, registration_id),
    UNIQUE INDEX `data_uq_institution_basic_info`(`registration_id`) USING BTREE COMMENT '唯一索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='医疗器械临床试验机构备案管理信息系统-机构基本信息表';


CREATE TABLE institution_professional_info (
    -- 备案号，外键，关联机构基本信息表
    record_id INT NOT NULL COMMENT '关联id',
    -- 专业名称
    profession_name VARCHAR(255) NOT NULL COMMENT '专业名称',
    -- 主要研究者
    main_researcher VARCHAR(255) NULL DEFAULT NULL COMMENT '主要研究者',
    -- 职称
    professional_title VARCHAR(255) NULL DEFAULT NULL COMMENT '职称',
    FOREIGN KEY (record_id) REFERENCES institution_basic_info(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='医疗器械临床试验机构备案管理信息系统-机构专业和主要研究者信息表';