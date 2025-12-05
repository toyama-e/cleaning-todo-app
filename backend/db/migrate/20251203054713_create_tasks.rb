class CreateTasks < ActiveRecord::Migration[8.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.references :cleaning_area, null: false, foreign_key: true
      t.datetime :do_at
      t.datetime :done_at
      t.string :memo
      t.string :status
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
