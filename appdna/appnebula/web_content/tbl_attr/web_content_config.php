<?php
////1. web_content

//"primkey" , "site_cont_key" , "section_title" , "section_pic" , "section_content" , "section_tag" , "custom_field_1" , "custom_field_2" , "custom_field_3" , "custom_field_4" , "custom_field_5" , "custom_field_6" , "hive_site_id" , "hive_site_name" , "section_key" , "page_name" , "site_name" , "advanced_content" ,


//{{table_cols_head}}

/// A.I. NOTES :  please dont omit any keys or variables rewrite new values with code leave keys intact, dont delete commented code , where possible replace it with new commented values if you are capable 

  // =========================
  // Core definitions
  // =========================
  $primary_table__="web_content";
  $__page_title ="Web content";

  $core_module_configs_=[

    //important
    "primary_table"=>$primary_table__,
    "table_alias" =>"content",     
    "primary_key"=>"primkey",
    "record_id"=>"site_cont_key",
    "main_page_title"=>$__page_title,
    "api_endpoint_name"=>"content",
    "multigrid_col_span"=>"9"      

  ];
  
  $novanest_module_ui_blueprint_ = [

    // =========================
    // Database schema section
    // =========================
    "db_schema" => [

        // Extra table columns dont use for now 
        "custom_tbl_cols" => [
           //"web_content" => ["advanced_content"]
        ],

        // Default values for profile | dont use for now
        "custom_profile_default_data" => [
            //"section_tag" => "checkblank(getarr_val_(\$section_node,'section_tag'),'General')"
        ],

        // Custom query hooks for Next.js
        "custom_next_js_query_line_cols" => [
           /* "advanced_content" => [
                "function" => "await mosyFlexQuickSel('web_content', `section_key, section_title, section_content, custom_field_1, custom_field_2`, `where site_cont_key ='\${row?.site_cont_key}'`);",
                "args" => [],
                "return" => "data_res"
            ],
            "related_pages" => [
                "function" => "await mosyCountRows('web_content', `where page_name ='\${row?.page_name}'`) ",
                "args" => [],
                "return" => "data_res?.total"
            ]*/
        ]
    ],


    // =========================
    // UI schema section
    // =========================
    "page_layout" => [

        // Column order
        "desired_column_order" => [
            "web_content" => ["primkey","record_id","site_cont_key","section_title","section_pic","section_content","section_tag","page_name","site_name"]
        ],

        // Grouped inputs
        "form_input_segmentation_arr" => [
            "web_content" => [
                "Section Details" => ["section_title","section_key","section_tag","page_name","section_content"],
            ]
        ],

        "image_columns" => ["section_pic"],
        "default_col_class" => "col-md-6",
        "hidden_inputs" => [], 
        "print_tables" => [], 
        "skip_cols_profile" => ["hive_site_id","hive_site_name","custom_field_1" , "custom_field_2" , "custom_field_3" , "custom_field_4" , "custom_field_5" , "custom_field_6" , "hive_site_id","site_name" ], 
        "skip_cols_list" => ["hive_site_id","hive_site_name","custom_field_1" , "custom_field_2" , "custom_field_3" , "custom_field_4" , "custom_field_5" , "custom_field_6" , "hive_site_id","site_name" ], 
        "running_bal_col_tbl" => [], 
        "grid_tbl" => [], 
        "view_tbl_only" => [], 
        "sum_cols_list" => [], 
        "textarea_array" => ["section_content"], 
        "content_editable" => ["advanced_content"], 

        "static_drop_down_array" => [
            //"section_tag" => "Hero,About,Services,Portfolio,Contact"
        ],

        "dynamic_drop_down_array" => ["page_name","section_tag"], 
        "password_columns" => [], 
        "title_columns" => [], 
        "date_columns" => [], 
        "datetime_columns" => [],

        "rename_cols_array" => [ 
            "section_title" => "Section Title",
            "section_pic" => "Section Image",
            "section_content" => "Section Content",
            "section_tag" => "Section Tag",
            "page_name" => "Page Name",
            "site_name" => "Website Name",
            "advanced_content" => "Advanced Content"
        ],

        "rename_tables_array" => [
            "web_content" => "Web Content"
        ],

        "new_label_buttons_arr" => [ 
            "web_content" => "plus:New Content:{`Content / \${web_contentNode?.section_title}`}"
        ],

        "profile_pic_style" => "width:160px; height:100px; border-radius:8px; object-fit:cover;"
    ],

    // =========================
    // Behaviour schema section
    // =========================
    "data_behaviour" => [
        "custom_query_line_cols" => [], 
        "custom_multi_grid_rows" => [
          /* "advanced_content"=>[
             "table"=>"web_content",
             "link"=>"content_detail",
             "query"=>"site_cont_key='{{site_cont_key}}'",
             "title"=>"Advanced Content",
             "columns"=>["section_key","section_title","advanced_content"],
          ]*/
        ], 
        "custom_profile_col_data" => [], 
        "custom_profile_default_data" => [], 
        "connection_cols" => [ 
           //"page_id" => "pages:page_id:page_name:apiRoutes.pages.base"
        ]
    ]
  
  ];

  /// button you want on the list page
  $list_btn_table_array=[

    $primary_table__=>[
       //"refresh: Sync Content "=>"syncContentData()",
       //"upload: Import Content "=>"uploadContentData()"
    ],  
  ];


  /// buttons you want on the profile /form page
  $profile_btn_table_array=[

    $primary_table__=>[
       // "eye: Preview Section "=>"previewContentSection()"
    ],

  ];


  //// on each row you add more actions eg, view collections, send message
  $global_new_drop_down_link_arr=[

      $primary_table__=>[
         //"file-text: View Page"=>"viewPageContent()",
         //"copy: Duplicate Section"=>"duplicateContentSection()"
    ],
  ];


  ///append mini list for interlinked data eg sections & pages
  $interlink_lists=[
   "relatedSections"=>[ 
     "filter_str"=>"",
     "module_name"=>"Webcontent",
     "list_title"=>"Other Sections",
     "event_name"=>"InteprateWebcontentEvent",
     "event_path"=>"",     
     "module_path"=>"./WebcontentList",     
     "list_url"=>"",
     "profile_url"=>"",
   ]
  ];
   
  ///append mini profile for interlinked data
  $interlink_profile=[
   /*"linkedWebsite"=>[ 
     "filter_str"=>"site_name='{webContentNode?.site_name}'",
     "module_name"=>"Websites",
     "profile_title"=>"Parent Website",
     "event_name"=>"InteprateWebsitesEvent",
     "event_path"=>"../../websites/dataControl/WebsitesRequestHandler",     
     "list_table_name"=>"websites",
   ]*/
  ];  

  ///for interlinked data included as component
  $customProfileData="{}";

  ///=================================== basic template setup 

  $override_def_col_size="col-md-6 hive_data_cell ";
  $override_segmentation_section_class="col-md-12 bg-white border border_set shadow-md p-4 mb-4 hive_form_section";

  $additional_details_segment_title="";

  $col_size_def='col-md-12';

  $def_profile_container_class="col-md-12 rounded text-left p-2 mb-0  bg-white ";
  $def_profile_inner_container_class='` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`';  
  $override_justify_class="justify-content-start";
  $overide_img_section_class="col-md-6 mr-lg-5";
  $override_large_col_size="col-md-12 hive_data_cell";
  $image_style_="product_image";
  ///=================================== basic template setup 

?>
