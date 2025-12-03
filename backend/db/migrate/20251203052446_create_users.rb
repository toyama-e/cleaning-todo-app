class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :mail
      t.string :pw
      t.string :role

      t.timestamps
    end
  end
end
