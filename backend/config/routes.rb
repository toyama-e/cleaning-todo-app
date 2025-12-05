Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    # /api/tasks/today
    get "tasks/today", to: "tasks#today"

    resources :tasks
    resources :users, only: [:index]
    resources :cleaning_areas, only: [:index]
  end
end
