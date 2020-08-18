
Pod::Spec.new do |s|
  s.name         = "RNZoomUs"
  s.version      = "2.0.0"
  s.summary      = "RNZoomUs"
  s.description  = <<-DESC
                  React Native integration for Zoom SDK
                   DESC
  s.homepage     = "https://github.com/mieszko4/react-native-zoom-us"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"

  s.source       = { :git => "https://github.com/mieszko4/react-native-zoom-us" }
  s.source_files  = "ios/*.{h,m}"
  s.requires_arc = true

  s.libraries = "sqlite3", "z.1.2.5", "c++"

  s.dependency "React"
  s.dependency "ZoomSDK", '5.0.24433.0616'
end

