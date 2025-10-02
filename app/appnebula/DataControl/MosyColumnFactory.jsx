const MosyColumnFactory = {

   //-- blog_posts cols--//
  blog_posts: ["post_id", "date_posted", "post_title", "post", "post_photo", "post_tag", "date_updated", "published", "post_keywords", "admin_id", "month_year", "hive_site_id", "hive_site_name", "publisher", "publisher_name"],

   //-- page_manifest_ cols--//
  page_manifest_: ["manikey", "page_group", "site_id", "page_url", "hive_site_id", "hive_site_name", "project_id", "project_name"],

   //-- projects cols--//
  projects: ["record_id", "title", "description", "thumbnail", "video_link", "category", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- system_role_bundles cols--//
  system_role_bundles: ["record_id", "bundle_id", "bundle_name", "remark", "hive_site_id", "hive_site_name"],

   //-- system_users cols--//
  system_users: ["user_id", "name", "email", "tel", "login_password", "ref_id", "regdate", "user_no", "user_pic", "user_gender", "last_seen", "about", "hive_site_id", "hive_site_name", "auth_token", "token_status", "token_expiring_in", "project_id", "project_name"],

   //-- user_bundle_role_functions cols--//
  user_bundle_role_functions: ["record_id", "bundle_id", "bundle_name", "role_id", "role_name", "remark", "hive_site_id", "hive_site_name"],

   //-- user_manifest_ cols--//
  user_manifest_: ["admin_mkey", "user_id", "user_name", "role_id", "site_id", "role_name", "hive_site_id", "hive_site_name", "project_id", "project_name"],

   //-- web_content cols--//
  web_content: ["site_cont_key", "section_title", "section_pic", "section_content", "section_tag", "custom_field_1", "custom_field_2", "custom_field_3", "custom_field_4", "custom_field_5", "custom_field_6", "hive_site_id", "hive_site_name", "section_key", "page_name", "site_name", "advanced_content"],


};
export default MosyColumnFactory;