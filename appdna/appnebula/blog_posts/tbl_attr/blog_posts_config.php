<?php
////1. blog_posts

//"primkey" , "post_id" , "date_posted" , "post_title" , "post" , "post_photo" , "post_tag" , "date_updated" , "published" , "post_keywords" , "admin_id" , "month_year" , "hive_site_id" , "hive_site_name" , "publisher" , "publisher_name" , 


//{{table_cols_head}}

/// A.I. NOTES :  please dont omit any keys or variables rewrite new values with code leave keys intact, dont delete commented code , where possible replace it with new commented values if you are capable 

  // =========================
  // Core definitions
  // =========================
  $primary_table__="blog_posts";
  $__page_title ="Blog Posts";

  $core_module_configs_=[

    //important
    "primary_table"=>$primary_table__,
    "table_alias" =>"blogposts",     
    "primary_key"=>"primkey",
    "record_id"=>"post_id",
    "main_page_title"=>$__page_title,
    "api_endpoint_name"=>"posts",
    "multigrid_col_span"=>"9"      

  ];
  
  $novanest_module_ui_blueprint_ = [

    // =========================
    // Database schema section
    // =========================
    "db_schema" => [

        // Extra table columns dont use for now 
        "custom_tbl_cols" => [
           //"blog_posts" => ["post_keywords","publisher"]
        ],

        // Default values for profile | dont use for now
        "custom_profile_default_data" => [
            //"post_tag" => "checkblank(getarr_val_(\$post_node,'post_tag'),'Uncategorized')"
        ],

        // Custom query hooks for Next.js
        "custom_next_js_query_line_cols" => [
            "related_comments" => [
                "function" => "await mosyFlexQuickSel('comments', `comment_id, comment_text, user_id, date_posted`, `where post_id ='\${row?.post_id}'`);",
                "args" => [],
                "return" => "data_res"
            ],
            "author_posts" => [
                "function" => "await mosyCountRows('blog_posts', `where admin_id ='\${row?.admin_id}'`)",
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
            "blog_posts" => ["primkey","record_id","post_id","date_posted","post_title","post","post_photo","date_updated","post_keywords","published","post_tag","publisher","publisher_name"]
        ],

        // Grouped inputs
        "form_input_segmentation_arr" => [
            "blog_posts" => [
                "Post Details" => ["post_title","post","post_photo","post_tag","published","post_keywords"],
                "Publication Info" => ["date_posted","date_updated","month_year","admin_id","publisher","publisher_name"]
            ]
        ],

        "image_columns" => ["post_photo"],
        "default_col_class" => "col-md-6",
        "hidden_inputs" => [], 
        "print_tables" => [], 
        "skip_cols_profile" => ["hive_site_id","hive_site_name" , "date_updated" , "admin_id" , "month_year" , "hive_site_id" , "hive_site_name" , "publisher" , "publisher_name" ], 
        "skip_cols_list" => ["hive_site_id","hive_site_name" , "date_updated" , "published" , "post_keywords" , "admin_id" , "month_year" , "hive_site_id" , "hive_site_name" , "publisher" , "publisher_name" ], 
        "running_bal_col_tbl" => [], 
        "grid_tbl" => [], 
        "view_tbl_only" => [], 
        "sum_cols_list" => [], 
        "textarea_array" => ["post_keywords"], 
        "content_editable" => ["post"], 

        "static_drop_down_array" => [
            "published" => "Draft,Published"
        ],

        "dynamic_drop_down_array" => ["post_tag"], 
        "password_columns" => [], 
        "title_columns" => ["post_title"], 
        "date_columns" => ["date_posted","date_updated"],
        "datetime_columns" => [],

        "rename_cols_array" => [ 
            "post_title" => "Post Title",
            "post" => "Post Content",
            "post_photo" => "Featured Image",
            "post_tag" => "Post Tag",
            "post_keywords" => "SEO Keywords",
            "date_posted" => "Date Posted",
            "date_updated" => "Last Updated",
            "published" => "Publish status",
            "month_year" => "Month-Year",
            "admin_id" => "Author ID",
            "publisher" => "Publisher",
            "publisher_name" => "Publisher Name"
        ],

        "rename_tables_array" => [
            "blog_posts" => "Blog Posts"
        ],

        "new_label_buttons_arr" => [ 
            "blog_posts" => "edit:New Post:{`Post / \${blog_postsNode?.post_title}`} "
        ],

        "profile_pic_style" => "width:160px; height:100px; border-radius:8px; object-fit:cover;"
    ],

    // =========================
    // Behaviour schema section
    // =========================
    "data_behaviour" => [
        "custom_query_line_cols" => [], 
        "custom_multi_grid_rows" => [
          /* "related_comments"=>[
             "table"=>"comments",
             "link"=>"comments_list",
             "query"=>"post_id='{{post_id}}'",
             "title"=>"Comments",
             "columns"=>["comment_text","user_id","date_posted"],
          ]*/
        ], 
        "custom_profile_col_data" => [], 
        "custom_profile_default_data" => [], 
        "connection_cols" => [ 
           //"admin_id" => "admins:admin_id:admin_name:apiRoutes.admins.base"
        ]
    ]
  
  ];

  /// button you want on the list page
  $list_btn_table_array=[

    $primary_table__=>[
       //"refresh: Sync Posts "=>"syncPostsData()",
       //"upload: Import Posts "=>"uploadPostsData()"
    ],  
  ];


  /// buttons you want on the profile /form page
  $profile_btn_table_array=[

    $primary_table__=>[
       // "eye: Preview Post "=>"previewBlogPost()"
    ],

  ];


  //// on each row you add more actions eg, view collections, send message
  $global_new_drop_down_link_arr=[

      $primary_table__=>[
         //"comments: View Comments"=>"viewPostComments()",
         //"copy: Duplicate Post"=>"duplicateBlogPost()"
    ],
  ];


  ///append mini list for interlinked data eg posts & comments
  $interlink_lists=[
   /*"relatedComments"=>[ 
     "filter_str"=>"post_id='\${blogPostsNode?.post_id}'",
     "module_name"=>"Comments",
     "list_title"=>"Post Comments",
     "event_name"=>"InteprateCommentsEvent",
     "event_path"=>"../../comments/dataControl/CommentsRequestHandler",     
     "module_path"=>"../../comments/uiControl/CommentsList",     
     "list_url"=>"../comments/list",
     "profile_url"=>"../comments/profile",
   ]*/
  ];
   
  ///append mini profile for interlinked data
  $interlink_profile=[
   /*"linkedAuthor"=>[ 
     "filter_str"=>"admin_id='{blogPostsNode?.admin_id}'",
     "module_name"=>"Admins",
     "profile_title"=>"Author Details",
     "event_name"=>"InteprateAdminsEvent",
     "event_path"=>"../../admins/dataControl/AdminsRequestHandler",     
     "list_table_name"=>"admins",
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
