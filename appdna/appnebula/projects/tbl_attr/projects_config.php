<?php
////1. projects

//"primkey" , "record_id" , "title" , "description" , "thumbnail" , "video_link" , "category" , "tags" , "cart" , "created_at" , "updated_at" , 

//{{table_cols_head}}

/// A.I. NOTES :  please dont omit any keys or variables rewrite new values with code leave keys intact, dont delete commented code , where possible replace it with new commented values if you are capable 

  // =========================
  // Core definitions
  // =========================
  $primary_table__="projects";
  $__page_title ="Project Portfolio";

  $core_module_configs_=[

    //important
    "primary_table"=>$primary_table__,
    "table_alias" =>"apps",     
    "primary_key"=>"primkey",
    "record_id"=>"record_id",
    "main_page_title"=>$__page_title,
    "api_endpoint_name"=>"projectsapi",
    "multigrid_col_span"=>"9"      

  ];
  
  $novanest_module_ui_blueprint_ = [

    // =========================
    // Database schema section
    // =========================
    "db_schema" => [

        // Extra table columns dont use for now 
        "custom_tbl_cols" => [
           //"projects" => ["extra_notes"]
        ],

        // Default values for profile | dont use for now
        "custom_profile_default_data" => [
            //"category" => "checkblank(getarr_val_(\$project_node,'category'),'Uncategorized')"
        ],

        // Custom query hooks for Next.js
        "custom_next_js_query_line_cols" => [
            "related_videos" => [
                "function" => "await mosyFlexQuickSel('projects', `title, video_link, category, tags`, `where category ='\${row?.category}'`);",
                "args" => [],
                "return" => "data_res"
            ],
            "cart_items" => [
                "function" => "await mosyCountRows('cart', `where project_id ='\${row?.record_id}'`)",
                "args" => [],
                "return" => "data_res?.total"
            ]
        ]
    ],


    // =========================
    // UI schema section
    // =========================
    "page_layout" => [

        // Column order
        "desired_column_order" => [
            "projects" => ["primkey","record_id","title","description","thumbnail","video_link","category","tags","cart","created_at","updated_at"]
        ],

        // Grouped inputs
        "form_input_segmentation_arr" => [
            "projects" => [
                "Project Details" => ["title","description","thumbnail","tags","cart"]
            ]
        ],

        "image_columns" => ["thumbnail"],
        "default_col_class" => "col-md-6",
        "hidden_inputs" => ["created_at","updated_at","cart"], 
        "print_tables" => [], 
        "skip_cols_profile" => ["hive_site_id","hive_site_name","created_at","updated_at","cart"], 
        "skip_cols_list" => ["hive_site_id","hive_site_name","created_at","updated_at","cart"], 
        "running_bal_col_tbl" => [],
        "grid_tbl" => [], 
        "view_tbl_only" => [],
        "sum_cols_list" => [], 
        "textarea_array" => [], 
        "content_editable" => ["title","description"], 

        "static_drop_down_array" => [
            //"category" => "Web,Mobile,UI/UX,Data,Other"
        ],

        "dynamic_drop_down_array" => ["category"], 
        "password_columns" => [], 
        "title_columns" => ["title"], 
        "date_columns" => ["created_at","updated_at"],
        "datetime_columns" => [],

        "rename_cols_array" => [ 
            "title" => "Project Title",
            "description" => "Description",
            "thumbnail" => "Thumbnail",
            "video_link" => "Video Link",
            "category" => "Category",
            "tags" => "Tags",
            "cart" => "Cart Reference",
            "created_at" => "Created On",
            "updated_at" => "Last Updated"
        ],

        "rename_tables_array" => [
            "projects" => "Projects"
        ],

        "new_label_buttons_arr" => [ 
            "projects" => "plus-circle:New Project:{`Project / \${projectsNode?.title}`}"
        ],

        "profile_pic_style" => "width:160px; height:100px; border-radius:8px;"
    ],

    // =========================
    // Behaviour schema section
    // =========================
    "data_behaviour" => [
        "custom_query_line_cols" => [], 
        "custom_multi_grid_rows" => [
          /* Example placeholder
          "related_projects"=>[
             "table"=>"projects",
             "link"=>"projects_list",
             "query"=>"category='{{category}}'",
             "title"=>"Related Projects",
             "columns"=>["title","video_link","category","tags"],
          ]*/
        ], 
        "custom_profile_col_data" => [], 
        "custom_profile_default_data" => [],
        "connection_cols" => [ 
           //"project_id" => "cart:project_id:cart_item:apiRoutes.cart.base"
        ]
    ]
  
  ];

  /// button you want on the list page
  $list_btn_table_array=[

    $primary_table__=>[
       //"upload: Import Farmers "=>"uploadFarmerData()"
       //"upload: Import Projects "=>"uploadProjectData()"
    ],  
  ];


  /// buttons you want on the profile /form page
  $profile_btn_table_array=[

    $primary_table__=>[
       //"sms: Send SMS "=>"sendFarmerSMS()"
       //"share: Share Project "=>"shareProjectLink()"
    ],

  ];


  //// on each row you add more actions eg, view collections, send message
  $global_new_drop_down_link_arr=[

      $primary_table__=>[
         //"tint: View Collections"=>"viewFarmerCollections()"
         //"eye: View Project"=>"viewProjectDetails()",
         //"clone: Duplicate Project"=>"duplicateProject()"
    ],
  ];


  ///append mini list for interlinked data
  $interlink_lists=[
   "relatedProjects"=>[ 
     "filter_str"=>"",
     "module_name"=>"Projectportfolio",
     "list_title"=>"Similar Projects",
     "event_name"=>"InteprateProjectportfolioEvent",
     "event_path"=>"",     
     "module_path"=>"./ProjectportfolioList",     
     "list_url"=>"../apps/list",
     "profile_url"=>"",
   ]
  ];
   
  ///append mini profile for interlinked data
  $interlink_profile=[
   /*"linkedCart"=>[ 
     "filter_str"=>"project_id='{projectsNode?.record_id}'",
     "module_name"=>"Cart",
     "profile_title"=>"Cart Details",
     "event_name"=>"InteprateProjectsEvent",
     "event_path"=>"../../projects/dataControl/ProjectsRequestHandler",     
     "list_table_name"=>"cart",
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
